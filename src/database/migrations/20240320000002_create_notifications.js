exports.up = function(knex) {
    return knex.schema.createTable('notifications', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.string('title').notNullable();
        table.text('message').notNullable();
        table.enum('type', ['appointment', 'chat', 'system']).defaultTo('system');
        table.boolean('read').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notifications');
}; 