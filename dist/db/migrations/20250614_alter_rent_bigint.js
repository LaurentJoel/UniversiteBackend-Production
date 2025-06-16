"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('rooms', (table) => {
        table.bigInteger('rent').alter();
    });
}
async function down(knex) {
    await knex.schema.alterTable('rooms', (table) => {
        table.decimal('rent', 10, 2).alter();
    });
}
