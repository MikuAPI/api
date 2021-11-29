import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'

/**
 * This controller's purpose is to easily control account's deletion requests & logic.
 */

export default class DeletionRequestsController {
  /**
   * Send an email to the person requesting deletion.
   *
   * User will be logged in.
   */
  public async requestDeletion({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    const signedDeletionUrl = Route.builder()
      .qs({ email: user.email })
      .prefixUrl(`${request.protocol()}://${request.host()}`)
      .makeSigned('DeletionRequestsController.deleteAccount', { expiresIn: '48h' })

    return await Mail.preview((message) => {
      message
        .from('admin@miku-for.us')
        .to('predeactor0@gmail.com')
        .subject('MikuAPI Account Deletion Request')
        .htmlView('email/deletion_request', { url: signedDeletionUrl, name: user.name })
    })
  }

  public async deleteAccount({}: HttpContextContract) {
    return 'Account deleted.'
  }
}
