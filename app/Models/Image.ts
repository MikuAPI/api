import { DateTime } from 'luxon'
import User from 'App/Models/User'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @attachment({ preComputeUrl: true })
  public image: AttachmentContract

  /**
   * This is the image's author, not the person who posted the image to the API.
   */
  @column()
  public imageAuthor: string

  /**
   * Where the image is coming from? The URL should redirect to the same image, and posted by
   * the author of the image (Twitter, Pixiv, DeviantArt, etc).
   */
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

  /**
   * Every image has been posted by an user.
   */
  @belongsTo(() => User)
  public author: BelongsTo<typeof User>
}
