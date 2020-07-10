exports.up = (knex) => {
  return knex.schema.createTable('CHAT_ROOM', (table) => {
    table.uuid('id').primary();
    table
      .integer('id_provider')
      .notNullable()
      .references('id')
      .inTable('PROVIDER');
    table.integer('id_client').notNullable().references('id').inTable('CLIENT');
    table.string('name_room').notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('CHAT_ROOM');
};
