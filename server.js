/**
 * Production entry point for the University Room Management backend
 * This file is the main server entry point
 */

// Import the compiled server app from the dist directory
const app = require('./dist/server');

// Use the default export to start the server
module.exports = app.default;
