"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const knex_1 = __importDefault(require("knex"));
const config = require('./knexfile');
const env = process.env.NODE_ENV || 'development';
const db = (0, knex_1.default)(config[env]);
module.exports = db;
