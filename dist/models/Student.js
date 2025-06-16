"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = getAllStudents;
exports.getStudentById = getStudentById;
exports.createStudent = createStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getStudentsByRoomId = getStudentsByRoomId;
const knex_1 = __importDefault(require("../db/knex"));
async function getAllStudents() {
    return (0, knex_1.default)('students').select('*');
}
async function getStudentById(id) {
    return (0, knex_1.default)('students').where({ id }).first();
}
async function createStudent(student) {
    const [created] = await (0, knex_1.default)('students').insert(student).returning('*');
    return created;
}
async function updateStudent(id, student) {
    const [updated] = await (0, knex_1.default)('students').where({ id }).update(student).returning('*');
    return updated;
}
async function deleteStudent(id) {
    await (0, knex_1.default)('students').where({ id }).del();
}
async function getStudentsByRoomId(roomId) {
    return (0, knex_1.default)('students').where({ roomId }).select('*');
}
