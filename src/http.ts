import {
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ServerError,
  ServiceError,
  ValidationError,
} from './errors.js';
import { TokenBucketRateLimiter } from './rate-limiter.js';
import {
  DEFAULT_BASE_URL,
  DEFAULT_MAX_RETRIES,
  DEFAULT_RATE_LIMIT,
  DEFAULT_TIMEOUT_MS,
  type AxcientClientConfig,
} from './config.js';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

function buildQueryString(params?: RequestOptions['params']): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

/** Reads the response body as text once, then attempts JSON.parse — never call response.json() then response.text(). */
async function readBody(response: Response): Promise<unknown> {
  const raw = await response.text();
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export class HttpClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly rateLimiter: TokenBucketRateLimiter | null;

  constructor(config: AxcientClientConfig) {
    if (!config.apiKey) {
      throw new Error('AxcientClient requires an apiKey');
    }
    this.baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.apiKey = config.apiKey;
    this.timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = config.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.rateLimiter =
      config.rateLimit === false
        ? null
        : new TokenBucketRateLimiter(
            config.rateLimit?.tokensPerInterval ?? DEFAULT_RATE_LIMIT.tokensPerInterval,
            config.rateLimit?.intervalMs ?? DEFAULT_RATE_LIMIT.intervalMs
          );
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const method = options.method ?? 'GET';
    const url = `${this.baseUrl}${path}${buildQueryString(options.params)}`;

    let attempt = 0;
    for (;;) {
      if (this.rateLimiter) await this.rateLimiter.acquire();

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);
      let response: Response;
      try {
        response = await fetch(url, {
          method,
          headers: {
            'x-api-key': this.apiKey,
            Accept: 'application/json',
            ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
          body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
          signal: controller.signal,
        });
      } catch (cause) {
        clearTimeout(timer);
        if (attempt < this.maxRetries) {
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
          continue;
        }
        throw new ServiceError(
          `Network error calling Axcient API: ${(cause as Error).message}`,
          0,
          undefined
        );
      }
      clearTimeout(timer);

      if (response.ok) {
        if (response.status === 204) return undefined as T;
        const body = await readBody(response);
        return body as T;
      }

      const body = await readBody(response);

      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('retry-after');
        const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : undefined;
        if (attempt < this.maxRetries) {
          attempt += 1;
          await new Promise((resolve) =>
            setTimeout(resolve, (retryAfter ?? 1) * 1000 || 500 * attempt)
          );
          continue;
        }
        throw new RateLimitError('Axcient API rate limit exceeded', retryAfter, body);
      }

      if (response.status >= 500) {
        if (attempt < this.maxRetries) {
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
          continue;
        }
        throw new ServerError(
          `Axcient API returned a server error (${response.status})`,
          response.status,
          body
        );
      }

      throw this.buildClientError(response.status, body);
    }
  }

  private buildClientError(status: number, body: unknown): ServiceError {
    // Shape 1: bad/revoked API key — {"message": "Unauthorized"} as application/json.
    if (
      status === 401 &&
      isPlainRecord(body) &&
      Object.keys(body).length === 1 &&
      body.message === 'Unauthorized'
    ) {
      return new AuthenticationError('Invalid or missing Axcient API key', body);
    }

    // Shape 2: known API quirk — invalid endpoint or non-numeric path parameter (e.g. a
    // bad client/device/vault ID) returns HTTP 401 with {"code": 401, "msg": "Unauthorized"}
    // instead of the documented 400. Normalize to ValidationError; see errors.ts docblock.
    if (
      status === 401 &&
      isPlainRecord(body) &&
      body.code === 401 &&
      body.msg === 'Unauthorized'
    ) {
      return new ValidationError(
        'Axcient API rejected the request — this usually means an invalid endpoint or a malformed path parameter (e.g. a non-numeric ID)',
        [],
        body,
        401
      );
    }

    // Shape 3/4/5: RFC7807 problem+json — {"detail", "status", "title", "type"}.
    if (isPlainRecord(body) && typeof body.detail === 'string' && typeof body.title === 'string') {
      const detail = body.detail;
      if (status === 404 || body.type === 'NotFoundException') {
        return new NotFoundError(detail, body);
      }
      if (status === 403 || body.type === 'ForbiddenException') {
        return new ForbiddenError(detail, body);
      }
      return new ValidationError(detail, [], body, status);
    }

    if (status === 404) return new NotFoundError('Resource not found', body);
    if (status === 403) return new ForbiddenError('Insufficient permissions', body);
    if (status === 401) return new AuthenticationError('Access token is missing or invalid', body);
    if (status === 400) return new ValidationError('Bad request', [], body, 400);

    return new ServiceError(`Axcient API returned an unexpected error (${status})`, status, body);
  }
}
