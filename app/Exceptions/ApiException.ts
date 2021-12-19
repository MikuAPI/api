import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ApiException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ApiException extends Exception {
  public async handle(this: this, ctx: HttpContextContract) {
    return ctx.response
      .status(this.status)
      .sendError(null, [this], this.message, this.status, this.code)
  }
}
