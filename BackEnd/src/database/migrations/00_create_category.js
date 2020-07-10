
exports.up = knex => {
    return knex.schema.createTable('CATEGORY', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
    })
}

exports.down = kenx => {
    return knex.schema.dropTable('CATEGORY');
}