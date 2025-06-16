"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Enhanced logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    const originalSend = res.send;
    let responseBody;
    // Log incoming request
    console.log(`\n🔵 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log('📥 Request Headers:', JSON.stringify(req.headers, null, 2));
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('📥 Request Body:', JSON.stringify(req.body, null, 2));
    }
    // Capture response body
    res.send = function (body) {
        responseBody = body;
        try {
            responseBody = JSON.parse(body);
        }
        catch {
            responseBody = body;
        }
        return originalSend.call(this, body);
    };
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`\n🔴 [${new Date().toISOString()}] Response to ${req.method} ${req.originalUrl}`);
        console.log(`📤 Status: ${res.statusCode} | Duration: ${duration}ms`);
        console.log('📤 Response Body:', JSON.stringify(responseBody, null, 2));
        console.log('─'.repeat(80));
    });
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'University Room Management Backend is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// API routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/rooms', roomRoutes_1.default);
app.use('/api/students', studentRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
app.use('/api/chambres', roomRoutes_1.default);
app.use('/api/etudiants', studentRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.use((err, req, res, next) => {
    console.error('💥 Unhandled error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});
const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || '0.0.0.0';
// For Vercel deployment
exports.default = app;
// For local development
if (require.main === module) {
    app.listen(PORT, HOST, () => {
        console.log(`🚀 Server running on ${HOST}:${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
