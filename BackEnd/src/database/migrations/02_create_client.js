exports.up = (knex) => {
  return knex.schema.createTable('CLIENT', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.integer('cep');
    table.string('address_city');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('CLIENT');
};
