import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { USER_ROLE } from 'App/constants'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create({
      ...data,
      role: USER_ROLE.USER,
    })

    return response.created(user.serialize())
  }
}
