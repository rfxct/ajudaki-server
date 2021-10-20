import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TicketMessages extends BaseSchema {
  protected tableName = 'ticket_messages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content').notNullable()

      table
        .integer('ticket_id')
        .unsigned()
        .references('tickets.id')
        .onDelete('CASCADE')
      table
        .integer('author_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
        
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
