"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserByEmailFromBothTables = findUserByEmailFromBothTables;
exports.createUser = createUser;
exports.comparePassword = comparePassword;
const db = require("../db/knex");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function findUserByEmail(email) {
    return db('users').where({ email }).first();
}
async function findUserByEmailFromBothTables(email) {
    // First check in users table (for admins)
    const adminUser = await db('users').where({ email }).first();
    if (adminUser) {
        return adminUser;
    }
    // Then check in students table (for students)
    const student = await db('students').where({ email }).first();
    if (student) {
        // Transform student to match User interface
        return {
            id: student.id,
            name: student.name,
            email: student.email,
            password: student.password,
            role: 'student'
        };
    }
    return undefined;
}
async function createUser(user) {
    const [created] = await db('users').insert(user).returning('*');
    return created;
}
async function comparePassword(plain, hash) {
    return bcryptjs_1.default.compare(plain, hash);
}
