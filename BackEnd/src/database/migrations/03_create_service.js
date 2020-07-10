
exports.up = knex => {
    return knex.schema.createTable('SERVICE', table => {
        table.increments('id').primary();
        table.integer('id_client')
            .notNullable()
            .references('id')
            .inTable('CLIENT');
        table.integer('id_provider')
            .notNullable()
            .references('id')
            .inTable('PROVIDER');
        table.integer('id_category')
            .notNullable()
            .references('id')
            .inTable('CATEGORY');
        table.string('type_service', 1).notNullable();
        table.date('date').defaultTo(knex.fn.now());
    })
}

exports.down = knex => {
    return knex.schema.dropTable('SERVICE');
}