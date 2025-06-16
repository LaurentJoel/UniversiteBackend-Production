"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('rooms', (table) => {
        table.integer('occupantCount').notNullable().defaultTo(0);
    });
}
async function down(knex) {
    await knex.schema.alterTable('rooms', (table) => {
        table.dropColumn('occupantCount');
    });
}
