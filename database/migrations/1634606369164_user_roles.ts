import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRoles } from 'Contracts/enums'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', Object.values(UserRoles))
      .after('password')
      .defaultTo(UserRoles.DEFAULT)
      .notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
