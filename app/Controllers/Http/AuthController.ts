import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  /**
   * Show the page to log an user.
   */
  public async loginPage({ view }: HttpContextContract) {
    return await view.render('pages/login')
  }

  /**
   * Try to authenticate an user.
   */
  public async authenticate({ request, auth }: HttpContextContract) {
    await auth.use('web').attempt(request.input('email'), request.input('password'))
  }
}
