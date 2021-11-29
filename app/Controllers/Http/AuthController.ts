import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  /**
   * Show the page to log an user.
   */
  public async loginPage({ view }: HttpContextContract) {
    return await view.render('pages/login')
  }

  /**
   * Show the page to register an user.
   */
  public async registerPage({ view }: HttpContextContract) {
    return await view.render('pages/register')
  }

  /**
   * Show the page to create an user.
   */
  public async signupPage({ view }: HttpContextContract) {
    return await view.render('pages/signup')
  }

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
