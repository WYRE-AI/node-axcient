/** Simple token-bucket rate limiter used to keep the client from bursting past the API. */
export class TokenBucketRateLimiter {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private readonly tokensPerInterval: number,
    private readonly intervalMs: number,
    now = Date.now()
  ) {
    this.tokens = tokensPerInterval;
    this.lastRefill = now;
  }

  private refill(now: number): void {
    const elapsed = now - this.lastRefill;
    if (elapsed <= 0) return;
    const refillAmount = (elapsed / this.intervalMs) * this.tokensPerInterval;
    this.tokens = Math.min(this.tokensPerInterval, this.tokens + refillAmount);
    this.lastRefill = now;
  }

  /** Resolves once a token is available, waiting if the bucket is empty. */
  async acquire(): Promise<void> {
    for (;;) {
      const now = Date.now();
      this.refill(now);
      if (this.tokens >= 1) {
        this.tokens -= 1;
        return;
      }
      const deficit = 1 - this.tokens;
      const waitMs = Math.ceil((deficit / this.tokensPerInterval) * this.intervalMs);
      await new Promise((resolve) => setTimeout(resolve, Math.max(waitMs, 10)));
    }
  }
}
