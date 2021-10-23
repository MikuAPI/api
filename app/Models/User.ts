import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Drive from '@ioc:Adonis/Core/Drive'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public avatar: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: ['OWNER', 'ADMIN', 'MANAGER', 'USER']

  @column()
  public status: ['PENDING', 'ACTIVE', 'SUSPENDED', 'DELETION_REQUESTED']

  @column()
  public suspendingReason: string

  @column()
  public suspendingAuthor: number

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

  @beforeSave()
  public static async cleanupAvatar(user: User) {
    if (user.$dirty.avatarFilename && user.$original.avatarFilename) {
      await Drive.delete(user.$original.avatarFilename)
    }
  }
}
