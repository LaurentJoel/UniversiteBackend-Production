"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRooms = getAllRooms;
exports.getRoomById = getRoomById;
exports.createRoom = createRoom;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
const knex_1 = __importDefault(require("../db/knex"));
async function getAllRooms() {
    return (0, knex_1.default)('rooms').select('*');
}
async function getRoomById(id) {
    return (0, knex_1.default)('rooms').where({ id }).first();
}
async function createRoom(room) {
    const [created] = await (0, knex_1.default)('rooms').insert(room).returning('*');
    return created;
}
async function updateRoom(id, room) {
    const [updated] = await (0, knex_1.default)('rooms').where({ id }).update(room).returning('*');
    return updated;
}
async function deleteRoom(id) {
    await (0, knex_1.default)('rooms').where({ id }).del();
}
