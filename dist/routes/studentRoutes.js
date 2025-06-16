"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_1 = require("../utils/validation");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateJWT, studentController_1.getAllStudents);
router.get('/:id', authMiddleware_1.authenticateJWT, studentController_1.getStudentById);
router.get('/:id/remaining-rent', authMiddleware_1.authenticateJWT, studentController_1.getStudentRemainingRent);
router.post('/', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validateStudent, validateRequest_1.validateRequest, studentController_1.createStudent);
router.put('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validateStudent, validateRequest_1.validateRequest, studentController_1.updateStudent);
router.delete('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), studentController_1.deleteStudent);
router.get('/matricule/:matricule', authMiddleware_1.authenticateJWT, async (req, res) => {
    // Implement get student by matricule
    // ...existing code...
});
exports.default = router;
