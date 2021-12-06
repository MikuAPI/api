import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isLoggedIn) {
      const user = await auth.authenticate()
      const REQUIRED_ROLE = ['OWNER', 'ADMIN']
      if (REQUIRED_ROLE.some((el) => user.role.includes(el))) {
        await next()
      } else {
        return response.forbidden()
      }
    } else {
      return response.forbidden()
    }
  }
}
