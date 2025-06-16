/**
 * Production entry point for the University Room Management backend
 * This file is the main server entry point
 */

// Import the compiled server app from the dist directory
const app = require('./dist/server').default;

// Add a root route for better health checks
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'University Room Management API is running',
    documentation: '/api/docs',
    healthCheck: '/health',
    timestamp: new Date().toISOString()
  });
});

// Define port - ensure we use the port Render provides via environment variable
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
});

// Export the app for testing or as a module
module.exports = app;
