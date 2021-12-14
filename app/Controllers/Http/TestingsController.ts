import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestingsController {
  public async index(ctx: HttpContextContract) {
    await ctx.auth.authenticate()
    await ctx.auth.user!.suspendUser(ctx.auth.user!, 'Test')
    ctx.response.redirect('/auth/me')
  }
}
