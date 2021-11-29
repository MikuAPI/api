import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public postAuthor: BelongsTo<typeof User>

  @attachment()
  public image: AttachmentContract

  @column() // The author of the image, the artist
  public imageAuthor: string

  @column()
  public imageSource: string

  @column()
  public likes: number

  @column()
  public dislikes: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
