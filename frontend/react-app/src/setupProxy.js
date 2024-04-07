const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: 'https://effective-space-enigma-x6j49v465773675r-3001.app.github.dev',
    changeOrigin: true
  }));

  console.log("Le fichier setupProxy.js est chargé !");
};