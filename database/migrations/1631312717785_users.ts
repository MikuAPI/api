import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 25).notNullable()
      table.string('avatar_filename').nullable()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.enum('role', ['OWNER', 'ADMIN', 'MANAGER', 'USER']).notNullable().defaultTo('USER')

      /**
       * Suspension
       */
      table
        .enum('status', ['PENDING', 'ACTIVE', 'SUSPENDED', 'DELETION_REQUESTED'])
        .defaultTo('PENDING')
        .notNullable()
      table.string('suspending_reason').nullable()
      table.integer('suspending_author').nullable().references('id').inTable('users').onDelete('')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
