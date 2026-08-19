export const DEFAULT_BASE_URL = 'https://axapi.axcient.com/x360recover';
export const DEFAULT_TIMEOUT_MS = 30_000;
export const DEFAULT_MAX_RETRIES = 2;
export const DEFAULT_RATE_LIMIT = { tokensPerInterval: 10, intervalMs: 1_000 };

export interface AxcientClientConfig {
  /** API key generated in x360Portal → Settings → API Keys, sent as `x-api-key`. */
  apiKey: string;
  /** Override the API base URL (e.g. the Axcient mock/wiremock server for testing). */
  baseUrl?: string;
  /** Per-request timeout in milliseconds. Default 30000. */
  timeoutMs?: number;
  /** Max retry attempts for 429/5xx responses. Default 2. */
  maxRetries?: number;
  /** Client-side token-bucket rate limit. Axcient does not publish a rate limit; this is a conservative default. */
  rateLimit?: { tokensPerInterval: number; intervalMs: number } | false;
}
