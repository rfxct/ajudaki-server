import { DateTime } from 'luxon'
import { BaseModel, column, computed, BelongsTo, belongsTo, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import User from './User'
import TicketMessage from './TicketMessage'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public finished: boolean

  @computed()
  public get status() {
    return this.finished ? 'resolvido' : (typeof this.assignedTo === 'number' ? 'em curso' : 'pendente')
  }

  @column()
  public createdBy: number

  @column()
  public assignedTo: number

  // Table columns
  @column()
  public subject: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relacionamentos
  @hasMany(() => TicketMessage, {
    foreignKey: 'ticketId'
  })
  public messages: HasMany<typeof TicketMessage>

  @belongsTo(() => User, {
    foreignKey: 'createdBy'
  })
  public creator: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'assignedTo'
  })
  public helper: BelongsTo<typeof User>
}
