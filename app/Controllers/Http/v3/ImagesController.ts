import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageCreateValidator from 'App/Validators/ImageCreateValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Image from 'App/Models/Image'

export default class ImagesController {
  /**
   * Return a random image storred in the database and return
   * JSON object with all informations.
   */
  public async random({ response, request }: HttpContextContract) {
    const image = await Image.all()
    if (image.length === 0) {
      return response.json({ error: 'No images were found in the database.' })
    }
    const randImage = image[Math.floor(Math.random() * image.length)]
    return response.json({
      url: `${request.protocol()}://${request.host()}${await randImage.image.getUrl()}`, // I hate this...
      artist: randImage.imageAuthor,
      source: randImage.imageSource,
    })
  }

  /**
   * Add an image into the database.
   */
  public async store({ response, request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = await request.validate(ImageCreateValidator)

    const image = await Database.transaction(async (transaction) => {
      user.useTransaction(transaction)

      const image = await user.related('postedImages').create({
        image: Attachment.fromFile(data.image),
        imageAuthor: data.author,
        imageSource: data.source,
      })
      await image.related('author').associate(user)
      return image
    })

    return response.ok(image.toJSON())
  }
}
