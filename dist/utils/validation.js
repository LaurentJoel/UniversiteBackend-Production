"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validatePayment = exports.validateStudent = exports.validateRoom = void 0;
const express_validator_1 = require("express-validator");
exports.validateRoom = [
    (0, express_validator_1.body)('number').notEmpty().withMessage('Room number is required'),
    (0, express_validator_1.body)('type').notEmpty().withMessage('Room type is required'),
    (0, express_validator_1.body)('status').isIn(['available', 'occupied', 'complet']).withMessage('Invalid status'),
    (0, express_validator_1.body)('maxOccupancy').isInt({ min: 1 }).withMessage('Max occupancy must be at least 1'),
];
exports.validateStudent = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
];
exports.validatePayment = [
    (0, express_validator_1.body)('studentId').isInt().withMessage('Student ID is required'),
    (0, express_validator_1.body)('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    (0, express_validator_1.body)('dueDate').notEmpty().withMessage('Due date is required'),
    (0, express_validator_1.body)('status').isIn(['paid', 'pending', 'overdue', 'cancelled']).withMessage('Invalid payment status'),
];
exports.validateLogin = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
