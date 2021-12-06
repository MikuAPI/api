/**
 * A controller that takes cares of the page's rendering.
 *
 * Every render (view.render) should technically be processed by this controller.
 * Exceptions can be done, but it should be a very rare case.
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async index({ view }: HttpContextContract) {
    return await view.render('pages/index')
  }

  public async newImage({ view }: HttpContextContract) {
    return await view.render('pages/new_image')
  }
}
