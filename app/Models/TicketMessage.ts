import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import Ticket from './Ticket'
import User from './User'

export default class TicketMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public ticketId: number

  @column()
  public authorId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacionamentos
  @belongsTo(() => Ticket, {
    foreignKey: 'ticketId'
  })
  public ticket: BelongsTo<typeof Ticket>

  @belongsTo(() => User, {
    foreignKey: 'authorId'
  })
  public author: BelongsTo<typeof User>
}
