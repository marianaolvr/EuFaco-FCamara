exports.up = (knex) => {
  return knex.schema.createTable('PROVIDER', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.integer('cep');
    table.string('address_city');
    table.string('type_service');
    table.string('description');
    table.integer('cpf', 11);
    table.integer('tel');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('PROVIDER');
};
