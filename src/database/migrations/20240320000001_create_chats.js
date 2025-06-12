exports.up = function(knex) {
    return knex.schema.createTable('chats', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.integer('doctor_id').notNullable().references('id').inTable('users');
        table.text('message').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('chats');
}; 