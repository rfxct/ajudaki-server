import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('finished')
      .after('id')
      .defaultTo(false)
      .notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('finished')
    })
  }
}
