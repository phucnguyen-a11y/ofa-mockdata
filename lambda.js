const jsonServer = require('json-server');
const serverless = require('serverless-http');
const path = require('path');

// Create JSON Server
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'mock/db.json'));
const middlewares = jsonServer.defaults({
    noCors: false,
    logger: false
});

// Apply middlewares
server.use(middlewares);

// Add custom routes if needed
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));

// Use router
server.use(router);

// Export handler for Lambda
module.exports.handler = serverless(server);
