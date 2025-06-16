"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('payments', (table) => {
        table.increments('id').primary();
        table.integer('studentId').unsigned().references('id').inTable('students').onDelete('CASCADE');
        table.decimal('amount', 10, 2).notNullable();
        table.date('dueDate').notNullable();
        table.date('paidDate');
        table.enu('status', ['paid', 'pending', 'overdue', 'cancelled']).notNullable().defaultTo('pending');
        table.string('description');
        table.string('roomNumber');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('payments');
}
