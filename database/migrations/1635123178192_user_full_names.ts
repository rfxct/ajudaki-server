import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('first_name', 60).notNullable().after('email')
      table.string('last_name', 80).notNullable().after('first_name')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
    })
  }
}
