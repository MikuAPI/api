import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserUpdateValidator from 'App/Validators/users/UpdateValidator'
import UserCreateValidator from 'App/Validators/users/CreateValidator'

export default class UsersController {
  /**
   * Return a list of users registered in the API. Only usable by
   * the owner or admin.
   */
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    return response.sendSuccess(users.map((user) => user.toJSON()))
  }

  /**
   * Get an user from their ID.
   */
  public async show({ request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    return response.sendSuccess(
      user.serialize({
        fields: {
          omit: [
            'email',
            'password',
            'remember_me_token',
            'suspending_reason',
            'suspending_author',
          ],
        },
      })
    )
  }

  public async update({ request }: HttpContextContract) {
    const data = await request.validate(UserUpdateValidator)
    await User.query().where('id', request.param('id')).update(data)
  }

  /**
   * Create an user.
   */
  public async store({ request, view }: HttpContextContract) {
    const userData = await request.validate(UserCreateValidator)
    const user = await User.create(userData)
    // TODO: Redirect user to a page to tell him to check his inbox
    return await view.render('pages/users/verify_account', {
      email: user.email,
    })
  }

  /**
   * Validate an user.
   *
   * The URL signature will be verified.
   */
  public async verifyUser({ response, request, auth }: HttpContextContract) {
    const user = await User.findByOrFail('email', request.qs()['email'])

    if (user.status === 'PENDING') {
      user.status = 'ACTIVE'
      await user.save()
      await auth.login(user)
      // TODO: Return to a page to tell the user that he is now verified
      return response.redirect('/user/login')
    } else {
      return response.forbidden({ error: 'User is not pending for validation', code: 409 })
    }
  }

  /**
   * Delete an user from service.
   *
   * The user will be logged in.
   * The URL's signature will be verified.
   */
  public async destroy({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.delete()
    return response.redirect('/goodbye')
  }
}
