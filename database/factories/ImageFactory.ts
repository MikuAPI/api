import Image from 'App/Models/Image'
import Drive from '@ioc:Adonis/Core/Drive'
import { file } from '@ioc:Adonis/Core/Helpers'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default Factory.define(Image, async ({ faker }) => {
  const attachment = new Attachment({
    extname: 'png',
    mimeType: 'image/png',
    size: 50*1000,
    name: `${faker.random.alphaNumeric(10)}.png`
  })

  attachment.isPersisted = true

  await Drive.put(attachment.name, (await file.generatePng('5mb')).contents)

  return {
    attachment: attachment,
    author: faker.name.firstName(),
    source: faker.internet.url()
  }
}).build()
