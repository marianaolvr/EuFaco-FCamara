exports.up = function (knex) {
  return knex.schema.createTable('BUDGET', (table) => {
    table.increments('id').primary();
    table.integer('id_client').notNullable().references('id').inTable('CLIENT');
    table
      .integer('id_provider')
      .notNullable()
      .references('id')
      .inTable('PROVIDER');
    table.string('description').notNullable();
    table.string('type_service', 1).notNullable();
    table.string('time').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('BUDGET');
};
