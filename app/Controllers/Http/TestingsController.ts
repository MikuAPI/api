import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestingsController {
  public async index(ctx: HttpContextContract) {
    const user = await ctx.auth.authenticate()
    return await ctx.view.render('pages/users/verify_account', { email: user.email })
  }
}
