import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import Logger from '@ioc:Adonis/Core/Logger'

export default class UsersController {
  /**
   * Ensure that the requesting user (From the request) has the power to delete the
   * account.
   *
   * An user will be logged in.
   */
  // private async hasPermissionToDeleteUser({ auth }: HttpContextContract, requestingUser: User) {
  //   const user = await auth.authenticate()
  //   if (user.role === 'ADMIN') {
  //     return true
  //   }
  //   return requestingUser.id === user.id
  // }

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
   * Create an user and return their infos (Such as ID, etc...)
   */
  public async requestUserCreation({ request, response }: HttpContextContract) {
    const userData = await request.validate(UserCreateValidator)
    const user = await User.create(userData)
    Logger.info(`New user registered! Please welcome ${user.name} (${user.email})`)
    // TODO: Redirect user to a page to tell him to check his inbox
    switch (request.accepts(['json', 'html'])) {
      case 'html':
        return response.redirect('/login')
      case 'json':
        return response.ok(user.toJSON())
    }
  }

  /**
   * Validate an user.
   *
   * The URl's signature will be verified.
   */
  public async verifyUser({ response, request, auth }: HttpContextContract) {
    const qs = request.qs()

    try {
      const user = await User.findByOrFail('email', qs['email'])
      if (user.status === 'PENDING') {
        user.status = 'ACTIVE'
        await user.save()
        switch (request.accepts(['html', 'json'])) {
          case 'html':
            await auth.login(user)
            return response.redirect('/user/login')
          case 'json':
            return response.accepted({
              message: 'User validated successfully',
              user: user.toJSON(),
            })
        }
      } else {
        return response.forbidden({ error: 'User is not pending for validation', code: 409 })
      }
    } catch {
      return response.notFound({ error: 'User not found', code: 404 })
    }
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
      const user = await User.findByOrFail('email', qs['email'])
      return { message: 'User would be deleted successfully.', user: user.toJSON() }
      // await user.delete()
    } catch (error) {
      response.notFound('User not found.')
    }
  }
}
