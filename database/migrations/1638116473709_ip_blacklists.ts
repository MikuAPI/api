import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IpBlacklists extends BaseSchema {
  protected tableName = 'ip_blacklists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('ip', 39).notNullable() // IPv4 are 32 chars long, IPv6 are 39 chars long.

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
