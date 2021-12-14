import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  /**
   * Try to authenticate an user.
   */
  public async login({ request, auth, response }: HttpContextContract) {
    await auth.use('web').attempt(request.input('id'), request.input('password'))
    return response.redirect('/')
  }

  /**
   * Logout an user.
   */
  public async logout({ auth, response }: HttpContextContract) {
    if (auth.isAuthenticated) {
      await auth.use('web').logout()
      return response.redirect('/')
    }
  }

  /**
   * Return the actual connected user in JSON.
   */
  public async me({ auth, response }: HttpContextContract) {
    if (auth.user) {
      return response.ok(auth.toJSON())
    } else {
      return response.json({
        error: 'Not authenticated',
      })
    }
  }
}
