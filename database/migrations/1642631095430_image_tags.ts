import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImageTags extends BaseSchema {
  protected tableName = 'image_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('image_id').unsigned().references('images.id').onDelete('CASCADE')
      table.string('tag_name').notNullable()

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
