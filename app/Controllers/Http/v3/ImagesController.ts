import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'

export default class ImagesController {
  /**
   * Return a random image storred in the database and return
   * JSON object with all informations.
   */
  public async random({ response }: HttpContextContract) {
    const image = await Image.all()
    return response.json(image)
  }

  /**
   * Add an image into the database.
   */
  public async store({ response }: HttpContextContract) {
    // const image = await Image.create()
    return response.json({ error: 'Work in progress.' })
  }
}
