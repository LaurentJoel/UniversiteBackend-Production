"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), userController_1.getAllUsers);
router.get('/:id', authMiddleware_1.authenticateJWT, userController_1.getUserById);
router.put('/:id', authMiddleware_1.authenticateJWT, userController_1.updateUser);
exports.default = router;
