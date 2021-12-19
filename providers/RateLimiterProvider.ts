import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import Config from '@ioc:Adonis/Core/Config'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class RateLimiterProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Adonis/Security/RateLimiter', () => {
      return new RateLimiterMemory({
        points: Config.get('ratelimiter.points'),
        duration: Config.get('ratelimiter.duration'),
        blockDuration: Config.get('ratelimiter.blockDuration'),
      })
    })
  }
}
