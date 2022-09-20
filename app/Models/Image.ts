import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @attachment({ preComputeUrl: true, folder: 'images!' })
  public attachment!: AttachmentContract

  @column()
  public author!: string

  @column()
  public source!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
