"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_1 = require("../utils/validation");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
router.post('/login', validation_1.validateLogin, validateRequest_1.validateRequest, authController_1.login);
router.get('/profile', authMiddleware_1.authenticateJWT, authController_1.getProfile);
router.get('/me', authMiddleware_1.authenticateJWT, authController_1.getProfile);
router.put('/me', authMiddleware_1.authenticateJWT, authController_1.updateProfile);
router.post('/logout', authMiddleware_1.authenticateJWT, (req, res) => {
    // For stateless JWT, just respond OK and let frontend clear token
    res.json({ success: true });
});
exports.default = router;
