import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.json('image').notNullable()

      table.string('image_author').notNullable() // To not confuse anyone, this is the person who made the image, not posted it
      table.string('image_source').notNullable().unique()

      table.integer('likes').defaultTo(0).notNullable()
      table.integer('dislikes').defaultTo(0).notNullable()

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
