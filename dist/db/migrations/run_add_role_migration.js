"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../knex"));
const _20250614_add_role_to_students_1 = require("../migrations/20250614_add_role_to_students");
async function runMigration() {
    try {
        console.log('Running migration to add role and phone columns to students table...');
        await (0, _20250614_add_role_to_students_1.up)(knex_1.default);
        console.log('Migration completed successfully!');
    }
    catch (error) {
        console.error('Migration failed:', error);
    }
    finally {
        await knex_1.default.destroy();
    }
}
runMigration();
