import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import Logger from '@ioc:Adonis/Core/Logger'

export default class UsersController {
  /**
   * Get an user from their ID.
   */
  public async show({ request, response }: HttpContextContract) {
    const user = await User.findOrFail(request.param('id'))
    return response.sendSuccess(user.toJSON())
  }

  public async update({ response }: HttpContextContract) {
    return response.sendSuccess('Work in progress')
  }

  /**
   * Create an user and return their infos (Such as ID, etc...)
   */
  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(UserCreateValidator)
    const user = await User.create(userData)
    Logger.info(`New user registered! Please welcome ${user.name} (${user.email})`)
    // TODO: Redirect user to a page to tell him to check his inbox
    return response.redirect('/login')
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
  public async destroy({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    /**
     * Because Drive does not handle images automatically when we delete the user account itself,
     * we get all images and delete them one by one. This way, Drive will delete the images.
     */
    await user.load('postedImages') // TODO: Need to check if this work as intended
    for (const image of user.postedImages) {
      await image.delete()
    }

    await user.delete()
    return response.sendSuccess(null, 'User deleted successfully')
  }
}
