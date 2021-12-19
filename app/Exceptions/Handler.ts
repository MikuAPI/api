/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
import ApiException from './ApiException'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: HttpException, ctx: HttpContextContract) {
    /**
     * The global exception handler.
     *
     * What it does is that in case we have made a request to the API directly
     * (A route that contain "api"), the error will be returned in JSON format.
     */
    try {
      if (ctx.request.url().includes('api')) {
        const apiException = new ApiException(error.message, error.status, error.code)
        return await apiException.handle(ctx)
      }

      return await super.handle(error, ctx)
    } catch (error) {
      /**
       * This try-catch is here to return a JSON response in any case.
       */
      this.logger.info('Here')
      return ctx.response.sendError(
        null,
        [new Error('Fatal internal server error.')],
        'Fatal internal server error.',
        500
      )
    }
  }
}
