"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('payments', (table) => {
        table.string('studentName').nullable();
    });
}
async function down(knex) {
    await knex.schema.alterTable('payments', (table) => {
        table.dropColumn('studentName');
    });
}
