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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controllers/roomController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validation_1 = require("../utils/validation");
const validateRequest_1 = require("../middleware/validateRequest");
const RoomModel = __importStar(require("../models/Room")); // Import RoomModel
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticateJWT, roomController_1.getAllRooms);
router.get('/:id', authMiddleware_1.authenticateJWT, roomController_1.getRoomById);
router.post('/', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validateRoom, validateRequest_1.validateRequest, roomController_1.createRoom);
router.put('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), validation_1.validateRoom, validateRequest_1.validateRequest, roomController_1.updateRoom);
router.delete('/:id', authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(['admin']), roomController_1.deleteRoom);
router.get('/status/:status', authMiddleware_1.authenticateJWT, async (req, res) => {
    const { status } = req.params;
    const rooms = await RoomModel.getAllRooms();
    const filtered = rooms.filter((room) => room.status === status);
    res.json(filtered);
});
router.get('/floor/:floor', authMiddleware_1.authenticateJWT, async (req, res) => {
    const { floor } = req.params;
    const rooms = await RoomModel.getAllRooms();
    const filtered = rooms.filter((room) => String(room.floor) === String(floor));
    res.json(filtered);
});
exports.default = router;
