import { bind } from '@adonisjs/route-model-binding'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Image from 'App/Models/Image'
import StoreValidator from 'App/Validators/Image/StoreValidator'
import UpdateValidator from 'App/Validators/Image/UpdateValidator'

/**
 * TODO: Implement authentication logic to allow store, update, destroy
 */

export default class ImagesController {
  public async index({}: HttpContextContract) {
    const images = (await Image.all()).map((value) => {
      return value.serialize()
    })
    return images
  }

  public async store({ request, response }: HttpContextContract) {
    return response.notImplemented()

    const { image, ...data } = await request.validate(StoreValidator)

    const attachment = Attachment.fromFile(image)
    const image_object = await Image.create({
      attachment: attachment,
      author: data.author_name,
      source: data.source_url
    })

    return response.created(image_object.serialize())
  }

  @bind()
  public async show({ response }: HttpContextContract, image: Image) {
    return response.ok(image.serialize())
  }

  @bind()
  public async update({ request, response }: HttpContextContract, image: Image) {
    return response.notImplemented()

    const data = await request.validate(UpdateValidator)

    image.merge({
      author: data.author_name,
      source: data.source_url,
    })
    const dirty = image.$dirty
    await image.save()

    return response.ok(dirty)
  }

  @bind()
  public async destroy({ response }: HttpContextContract, image: Image) {
    return response.notImplemented()

    await image.delete()

    return response.ok({
      deleted: image.$isDeleted
    })
  }
}
