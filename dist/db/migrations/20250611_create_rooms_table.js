"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('rooms', (table) => {
        table.increments('id').primary();
        table.string('number').notNullable();
        table.string('type').notNullable();
        table.enu('status', ['available', 'occupied', 'maintenance']).notNullable().defaultTo('available');
        table.integer('maxOccupancy').notNullable();
        table.integer('floor');
        table.decimal('rent', 10, 2);
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('rooms');
}
