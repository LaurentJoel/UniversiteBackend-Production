"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('students', (table) => {
        table.string('password').notNullable().defaultTo('defaultpassword');
    });
}
async function down(knex) {
    await knex.schema.alterTable('students', (table) => {
        table.dropColumn('password');
    });
}
