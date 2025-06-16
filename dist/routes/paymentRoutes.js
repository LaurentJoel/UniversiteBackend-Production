"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_1 = require("../utils/validation");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateJWT, paymentController_1.getAllPayments);
router.get('/student/:studentId', authMiddleware_1.authenticateJWT, paymentController_1.getPaymentsByStudentId);
router.get('/:id', authMiddleware_1.authenticateJWT, paymentController_1.getPaymentById);
router.post('/', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validatePayment, validateRequest_1.validateRequest, paymentController_1.createPayment);
router.put('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validatePayment, validateRequest_1.validateRequest, paymentController_1.updatePayment);
router.delete('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), paymentController_1.deletePayment);
exports.default = router;
