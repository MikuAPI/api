import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Logger from '@ioc:Adonis/Core/Logger'
import UserDeleteValidator from 'App/Validators/UserDeleteValidator'

/**
 * This controller's purpose is to easily control account's deletion requests & logic.
 */

export default class DeletionRequestsController {
  /**
   * Send an email to the person requesting deletion.
   *
   * User will be logged in.
   */
  public async requestDeletion({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()
    const signedDeletionUrl = Route.builder()
      .qs({ email: user.email })
      .prefixUrl(`${request.protocol()}://${request.host()}`)
      .makeSigned('DeletionRequestsController.deleteAccount', { expiresIn: '48h' })

    /**
     * TODO: Change this function to return a real email. This is just for testing purposes
     * at the moment.
     */
    response.redirect(
      (
        await Mail.preview((message) => {
          message
            .from('admin@miku-for.us')
            .to('predeactor0@gmail.com')
            .subject('MikuAPI Account Deletion Request')
            .htmlView('email/deletion_request', { url: signedDeletionUrl, name: user.name })
        })
      ).url
    )
  }

  public async deleteAccount({ request, response }: HttpContextContract) {
    const { email } = await request.validate(UserDeleteValidator)

    try {
      const user = await User.findByOrFail('email', email)

      /**
       * First of all, images in Drive are not deleted automatically when the user is deleted.
       * (Compared to deleting the image itself), so we need to gather all images the user posted
       * before, and delete them manually.
       */
      const images = await user.load('postedImages').then(() => user.postedImages)
      Logger.info(`Deleting ${images.length} image(s), reason: account deletion request.`)

      for (const image of images) {
        /**
         * The deletion of each image is now safely handled by Drive.
         */
        await image.delete()
      }

      await user.delete()

      return response.accepted({ message: 'Account deleted', code: 200 })
    } catch (notFound) {
      return response.notFound({ message: 'User not found', code: 404, error: notFound })
    }
  }
}
