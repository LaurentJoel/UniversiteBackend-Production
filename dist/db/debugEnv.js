"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env.production') });
console.log('🔍 Environment variables test:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'LOADED' : 'NOT LOADED');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('\n📁 File paths:');
console.log('Current file:', __filename);
console.log('Current dir:', __dirname);
console.log('Expected env file:', path_1.default.join(__dirname, '..', '..', '.env.production'));
const fs_1 = __importDefault(require("fs"));
const envPath = path_1.default.join(__dirname, '..', '..', '.env.production');
console.log('Env file exists:', fs_1.default.existsSync(envPath));
if (fs_1.default.existsSync(envPath)) {
    console.log('Env file contents:');
    console.log(fs_1.default.readFileSync(envPath, 'utf8').split('\n').map(line => line.includes('PASSWORD') ? line.replace(/=.*/, '=***') : line).join('\n'));
}
