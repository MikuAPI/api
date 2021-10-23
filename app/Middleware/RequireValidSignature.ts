import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RequireValidSignature {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    if (!request.hasValidSignature()) {
      return response.forbidden('Request does not have a valid signature')
    }
    await next()
  }
}
