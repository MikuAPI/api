import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Image from 'App/Models/Image'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { column, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

const rolesType = ['OWNER', 'ADMIN', 'MANAGER', 'USER'] as const
const statusType = ['PENDING', 'ACTIVE', 'SUSPENDED'] as const

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @attachment()
  public avatar: AttachmentContract | null

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: typeof rolesType[number]

  @column()
  public status: typeof statusType[number]

  @column()
  public suspendingReason: string | null

  @column()
  public suspendingAuthor: number | null

  @hasMany(() => Image)
  public postedImages: HasMany<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async suspendUser(author: this, reason?: string) {
    this.status = 'SUSPENDED'
    this.suspendingAuthor = author.id
    this.suspendingReason = reason ? reason : null
  }
}
