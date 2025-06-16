"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.enu('role', ['admin', 'student']).notNullable();
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('users');
}
