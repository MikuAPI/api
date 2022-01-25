/**
 * A controller that takes cares of the page's rendering.
 *
 * Every render (view.render) should technically be processed by this controller.
 * Exceptions can be done, but it should be a very rare case.
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  /**
   * Show the main page.
   */
  public async index({ view }: HttpContextContract) {
    return await view.render('pages/index')
  }

  /**
   * Show the page to log an user.
   */
  public async loginPage({ view }: HttpContextContract) {
    return await view.render('pages/login')
  }

  /**
   * Show the page to register an user.
   */
  public async registerPage({ view }: HttpContextContract) {
    return await view.render('pages/register')
  }

  /**
   * Show the page to create an user.
   */
  public async signupPage({ view }: HttpContextContract) {
    return await view.render('pages/signup')
  }

  /**
   * Show the page to add an image to the API.
   */
  public async newImage({ view }: HttpContextContract) {
    return await view.render('pages/new_image')
  }

  /**
   * Show the after account deletion page (goodbye).
   */
  public async goodbye({ view }: HttpContextContract) {
    return await view.render('pages/deletion_complete')
  }
}
