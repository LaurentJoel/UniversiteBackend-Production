"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.string('phone');
        table.string('department');
        table.string('employeeId');
        table.string('studentId');
        table.string('roomNumber');
        table.date('enrollmentDate');
    });
}
async function down(knex) {
    await knex.schema.alterTable('users', (table) => {
        table.dropColumn('phone');
        table.dropColumn('department');
        table.dropColumn('employeeId');
        table.dropColumn('studentId');
        table.dropColumn('roomNumber');
        table.dropColumn('enrollmentDate');
    });
}
