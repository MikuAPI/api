import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Logger from '@ioc:Adonis/Core/Logger'

export default class UsersController {
  /**
   * Ensure that the requesting user (From the request) has the power to delete the
   * account.
   *
   * An user will be logged in.
   */
  private async hasPermissionToDeleteUser({ auth }: HttpContextContract) {
    const user = auth.user
    return user?.role
  }

  /**
   * Get an user from their ID.
   */
  public async getUserInformation({ request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(request.param('id'))
      return user.toJSON()
    } catch (error) {
      response.notFound('User not found')
    }
  }

  /**
   * Show the page to create an user.
   */
  public async signupPage({ view }: HttpContextContract) {
    return await view.render('pages/signup')
  }

  /**
   * Create an user and return their infos (Such as ID, etc...)
   */
  public async createUser({ request, response }: HttpContextContract) {
    const user = await User.create(await request.validate(UserCreateValidator))
    Logger.info(`New user registered! Please welcome ${user.name} (${user.email})`)
    switch (request.accepts(['json', 'html'])) {
      case 'html':
        return response.redirect('/login')
      case 'json':
        return response.ok(user.toJSON())
    }
  }

  /**
   * Send an email to the person requesting deletion.
   *
   * User will be logged in.
   */
  public async requestDeletion({ auth, response }: HttpContextContract) {
    const signedDeletionUrl = Route.builder()
      .qs({ email: auth.user?.email })
      .makeSigned('UsersController.deleteUser', { expiresIn: '72h' })
    response.redirect(signedDeletionUrl)
    return await Mail.preview((message) => {
      message
        .from('admin@miku-for.us')
        .to('predeactor0@gmail.com')
        .subject('MikuAPI Account Deletion Request')
        .htmlView('email/deletion_request', { url: signedDeletionUrl, name: auth.user?.name })
    })
  }

  /**
   * Delete an user from service.
   *
   * The user will be logged in.
   * The URL's signature will be verified.
   */
  public async deleteUser({ request, response }: HttpContextContract) {
    const qs = request.qs()

    try {
      const user = await User.findOrFail(qs["email"])
      return {message: 'User would be deleted successfully.', user: user.toJSON()}
      // await user.delete()
    } catch (error) {
      response.notFound('User not found.')
    }
  }
}
