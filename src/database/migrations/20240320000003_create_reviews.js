exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.integer('doctor_id').notNullable().references('id').inTable('users');
        table.integer('rating').notNullable().checkIn([1, 2, 3, 4, 5]);
        table.text('comment');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
}; 