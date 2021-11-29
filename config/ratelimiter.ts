import { IRateLimiterOptions } from 'rate-limiter-flexible'

const throttleConfig: IRateLimiterOptions = {
  points: 20,
  duration: 10,
  blockDuration: 60,
}
export default throttleConfig
