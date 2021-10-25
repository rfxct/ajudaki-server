import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { column, afterFind, beforeSave, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { UserRoles } from 'Contracts/enums'
import Ticket from './Ticket'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public fullName: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: UserRoles

  @column.dateTime({ autoCreate: true, columnName: 'created_at' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: 'updated_at' })
  public updatedAt: DateTime

  // Relacionamentos
  @hasMany(() => Ticket, {
    foreignKey: 'createdBy'
  })
  public tickets: HasMany<typeof Ticket>

  @hasMany(() => Ticket, {
    foreignKey: 'assignedTo'
  })
  public assignedTickets: HasMany<typeof Ticket>

  // Password hash
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // Virtual columns
  @afterFind()
  public static insertFullName(user: User) {
    user.fullName = [user.firstName, user.lastName].join(' ')
  }
}
