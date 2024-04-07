const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '..', '..', '..', 'backend', '.env');
dotenv.config({ path: envPath });

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: process.env.HOST_NAME_BACKEND,
    changeOrigin: true
  }));
};