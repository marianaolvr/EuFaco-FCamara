
exports.up = knex => {
    return knex.schema.createTable('PROVIDER_CATEGORY', table => {
        table.increments('id').primary();
        table.integer('id_provider')
            .notNullable()
            .references('id')
            .inTable('PROVIDER');
        table.integer('id_category')
            .notNullable()
            .references('id')
            .inTable('CATEGORY');
    })
}

exports.down = knex => {
    return knex.schema.dropTable('PROVIDER_CATEGORY');
}