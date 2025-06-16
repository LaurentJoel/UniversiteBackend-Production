"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const knex_1 = __importDefault(require("../knex"));
async function up() {
    // Check if the role column already exists
    const hasRoleColumn = await knex_1.default.schema.hasColumn('students', 'role');
    if (!hasRoleColumn) {
        // Add the role column to the students table
        return knex_1.default.schema.table('students', (table) => {
            table.string('role').defaultTo('student');
        });
    }
}
async function down() {
    // Remove the role column if it exists
    const hasRoleColumn = await knex_1.default.schema.hasColumn('students', 'role');
    if (hasRoleColumn) {
        return knex_1.default.schema.table('students', (table) => {
            table.dropColumn('role');
        });
    }
}
// Run the migration when this file is imported directly
if (require.main === module) {
    up()
        .then(() => {
        console.log('✅ Migration completed: Added role column to students table');
        process.exit(0);
    })
        .catch((err) => {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    });
}
