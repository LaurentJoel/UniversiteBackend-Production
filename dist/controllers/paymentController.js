"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayments = getAllPayments;
exports.getPaymentsByStudentId = getPaymentsByStudentId;
exports.getPaymentById = getPaymentById;
exports.createPayment = createPayment;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
const PaymentModel = __importStar(require("../models/Payment"));
async function getAllPayments(req, res) {
    const payments = await PaymentModel.getAllPayments();
    res.json(payments);
}
async function getPaymentsByStudentId(req, res) {
    const studentId = Number(req.params.studentId);
    const payments = await PaymentModel.getPaymentsByStudentId(studentId);
    res.json(payments);
}
async function getPaymentById(req, res) {
    const payment = await PaymentModel.getPaymentById(Number(req.params.id));
    if (!payment)
        return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
}
async function createPayment(req, res) {
    const payment = await PaymentModel.createPayment(req.body);
    res.status(201).json(payment);
}
async function updatePayment(req, res) {
    const updated = await PaymentModel.updatePayment(Number(req.params.id), req.body);
    if (!updated)
        return res.status(404).json({ error: 'Payment not found' });
    res.json(updated);
}
async function deletePayment(req, res) {
    await PaymentModel.deletePayment(Number(req.params.id));
    res.status(204).send();
}
