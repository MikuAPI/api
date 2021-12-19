import { ApplicationContract } from '@ioc:Adonis/Core/Application'

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

export default class ResponseProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const ResponseContract = this.app.container.use('Adonis/Core/Response')

    ResponseContract.macro('sendSuccess', (data: any, message?: string, status?: number) => {
      return {
        data: data,
        message: message || null,
        status: status || 200,
      }
    })

    ResponseContract.macro(
      'sendError',
      (data: any, errors: Error[], message?: string, status?: number, code?: string) => {
        return {
          data: data,
          errors: errors.map((error: Error) => {
            return {
              message: error.message,
              name: error.name,
            }
          }),
          message: message,
          status: status || 400,
          code: code,
        }
      }
    )
  }
}
