import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RateLimiter from '@ioc:Adonis/Security/RateLimiter'
import { ResponseContract } from '@ioc:Adonis/Core/Response'

export default class Ratelimiter {
  private applyHeaders(response: ResponseContract, rateLimiterResponse: any) {
    response.append('X-RateLimit-Limit', rateLimiterResponse.points)
    response.append('X-RateLimit-Remaining', rateLimiterResponse.remainingPoints)
    response.append(
      'X-RateLimit-Reset',
      new Date(Date.now() + rateLimiterResponse.msBeforeNext).toISOString()
    )
  }

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    RateLimiter.consume(request.ip(), 1) // <-- use RateLimiter here
      .then((rateLimiterResponse) => {
        this.applyHeaders(response, rateLimiterResponse)
      })
      .catch((rateLimiterResponse) => {
        this.applyHeaders(response, rateLimiterResponse)
        switch (request.accepts(['html', 'json'])) {
          case 'html':
            // TODO: Create a page for ratelimits.
            return response.internalServerError({ error: 'Work in progress', code: 500 })
          case 'json':
            return response.tooManyRequests({ error: 'Too many request', code: 429 })
          default:
            return response.tooManyRequests('Ratelimit reached')
        }
      }).catch
    await next()
  }
}
