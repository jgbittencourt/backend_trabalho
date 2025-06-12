exports.up = function(knex) {
    return knex.schema.createTable('appointments', function(table) {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.integer('doctor_id').notNullable().references('id').inTable('users');
        table.date('date').notNullable();
        table.time('time').notNullable();
        table.enum('status', ['scheduled', 'completed', 'cancelled']).defaultTo('scheduled');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('appointments');
}; 