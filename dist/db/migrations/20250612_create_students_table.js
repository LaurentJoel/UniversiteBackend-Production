"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('students', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('matricule');
        table.string('filiere');
        table.integer('niveau');
        table.date('enrollmentDate');
        table.string('phone');
        table.integer('roomId').unsigned().references('id').inTable('rooms').onDelete('SET NULL');
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('students');
}
