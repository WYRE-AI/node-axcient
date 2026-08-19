export class ServiceError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API key is missing, revoked, or otherwise rejected.
 * Axcient returns this as `{"message": "Unauthorized"}` (application/json, HTTP 401).
 */
export class AuthenticationError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 401, response);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ForbiddenError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 403, response);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string, response: unknown) {
    super(message, 404, response);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown for malformed requests. Axcient's `/x360recover` API is documented to
 * return HTTP 400 with a `problem+json` body for bad request shapes, but for
 * invalid path parameters (e.g. a non-numeric ID) or unknown endpoints it
 * actually returns HTTP 401 with `{"code": 401, "msg": "Unauthorized"}` instead —
 * a known API quirk (see README "Known API quirks"). This SDK normalizes both
 * cases to ValidationError so callers don't need to special-case the wrong
 * status code; the real HTTP status Axcient sent is preserved on `statusCode`.
 */
export class ValidationError extends ServiceError {
  constructor(
    message: string,
    public errors: Array<{ field?: string; message: string }>,
    response: unknown,
    statusCode = 400
  ) {
    super(message, statusCode, response);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class RateLimitError extends ServiceError {
  constructor(
    message: string,
    public retryAfter: number | undefined,
    response: unknown
  ) {
    super(message, 429, response);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ServerError extends ServiceError {
  constructor(message: string, statusCode: number, response: unknown) {
    super(message, statusCode, response);
    this.name = 'ServerError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
