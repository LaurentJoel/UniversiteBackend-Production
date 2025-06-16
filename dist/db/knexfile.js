"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = { development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'aws-0-eu-north-1.pooler.supabase.com',
            user: process.env.DB_USER || 'postgres.nezwavnslymfssrlsxbj',
            password: process.env.DB_PASSWORD || 'mkounga10',
            database: process.env.DB_NAME || 'postgres',
            port: +(process.env.DB_PORT || 5432),
            ssl: {
                rejectUnauthorized: false,
                ca: undefined
            }
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'seeds')
        }
    }, production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: +(process.env.DB_PORT || 5432),
            ssl: {
                rejectUnauthorized: false,
                ca: undefined
            }
        },
        migrations: {
            directory: path_1.default.join(__dirname, 'migrations')
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'seeds')
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};
module.exports = config;
