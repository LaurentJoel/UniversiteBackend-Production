"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = getAllPayments;
exports.getPaymentsByStudentId = getPaymentsByStudentId;
exports.getPaymentById = getPaymentById;
exports.createPayment = createPayment;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
const knex_1 = __importDefault(require("../db/knex"));
async function getAllPayments() {
    return (0, knex_1.default)('payments').select('*');
}
async function getPaymentsByStudentId(studentId) {
    return (0, knex_1.default)('payments').where({ studentId }).select('*');
}
async function getPaymentById(id) {
    return (0, knex_1.default)('payments').where({ id }).first();
}
async function createPayment(payment) {
    const [created] = await (0, knex_1.default)('payments').insert(payment).returning('*');
    return created;
}
async function updatePayment(id, payment) {
    const [updated] = await (0, knex_1.default)('payments').where({ id }).update(payment).returning('*');
    return updated;
}
async function deletePayment(id) {
    await (0, knex_1.default)('payments').where({ id }).del();
}
