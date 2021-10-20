import { DateTime } from 'luxon'

import { BaseModel, column, BelongsTo, belongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TicketMessage from './TicketMessage'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public subject: string

  @column()
  public description: string

  @column()
  public createdBy: number

  @column()
  public assignedTo?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacionamentos
  @belongsTo(() => User, {
    localKey: 'createdBy'
  })
  public creator: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'assignedTo'
  })
  public helper: BelongsTo<typeof User>

  @hasMany(() => TicketMessage)
  public messages: HasMany<typeof TicketMessage>
}
