"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function seed(knex) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@university.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hash = await bcryptjs_1.default.hash(adminPassword, 10);
    await knex('users').insert({
        name: 'Admin',
        email: adminEmail,
        password: hash,
        role: 'admin',
    }).onConflict('email').ignore();
}
