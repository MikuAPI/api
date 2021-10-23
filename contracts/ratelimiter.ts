/**
 * Ratelimiter singleton provided by rate-limiter-flexible.
 */
declare module '@ioc:Security/RateLimiter' {
  import { RateLimiterMemory } from "rate-limiter-flexible";
  const RateLimiter: RateLimiterMemory
  export default RateLimiter
}
