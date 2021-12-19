import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestingsController {
  public async index(ctx: HttpContextContract) {
    throw new Error('fuck.')
  }
}
