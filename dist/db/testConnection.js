"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '..', '.env.production') });
const testConnection = async () => {
    console.log('🔍 Testing database connection...');
    // Debug environment variables
    console.log('📋 Environment variables:');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    console.log('DB_NAME:', process.env.DB_NAME);
    console.log('DB_PORT:', process.env.DB_PORT);
    console.log('DB_PASSWORD (actual):', process.env.DB_PASSWORD); // Show actual password for debugging  console.log('📋 Trying connection string approach...');
    const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`;
    console.log('🔗 Connection string:', connectionString.replace(process.env.DB_PASSWORD, '***'));
    const db = (0, knex_1.default)({
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
        }
    });
    try {
        // Test connection
        await db.raw('SELECT 1');
        console.log('✅ Database connection successful!');
        // Check if tables exist
        const tables = await db.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('📊 Existing tables:', tables.rows.map((r) => r.table_name));
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
    finally {
        await db.destroy();
    }
};
if (require.main === module) {
    testConnection()
        .then(() => {
        console.log('🏁 Test completed');
        process.exit(0);
    })
        .catch((error) => {
        console.error('💥 Test failed:', error);
        process.exit(1);
    });
}
exports.default = testConnection;
