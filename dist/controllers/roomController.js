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
exports.getAllRooms = getAllRooms;
exports.getRoomById = getRoomById;
exports.createRoom = createRoom;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
const RoomModel = __importStar(require("../models/Room"));
async function getAllRooms(req, res) {
    try {
        const rooms = await RoomModel.getAllRooms();
        res.json({
            success: true,
            data: rooms
        });
    }
    catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch rooms',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
async function getRoomById(req, res) {
    try {
        console.log('Getting room by ID:', req.params.id);
        const room = await RoomModel.getRoomById(Number(req.params.id));
        console.log('Room found:', room);
        if (!room) {
            console.log('Room not found for ID:', req.params.id);
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.json({
            success: true,
            data: room
        });
    }
    catch (error) {
        console.error(`Error fetching room ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch room',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
async function createRoom(req, res) {
    try {
        const room = await RoomModel.createRoom(req.body);
        res.status(201).json({
            success: true,
            data: room,
            message: 'Room created successfully'
        });
    }
    catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create room',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
async function updateRoom(req, res) {
    try {
        const updated = await RoomModel.updateRoom(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }
        res.json({
            success: true,
            data: updated,
            message: 'Room updated successfully'
        });
    }
    catch (error) {
        console.error(`Error updating room ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to update room',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
async function deleteRoom(req, res) {
    try {
        await RoomModel.deleteRoom(Number(req.params.id));
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    }
    catch (error) {
        console.error(`Error deleting room ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete room',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
