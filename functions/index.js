const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://localhost',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://localhost:5000',
      'http://localhost:5001',
      'http://localhost:5173',
      'http://localhost:1313',
      'https://salem-wchost.web.app',
      'https://salem-wchost-svelte.web.app',
      'https://salem-wchost--test-p09qrlga.web.app',
      'https://us-central1-salem-wchost.cloudfunctions.net',
      'https://wchost.salem.edu',
      // 'https://test-my-api-endpoint.web.app',
      // 'https://test-my-api-endpoint.firebaseapp.com',
      // 'https://sites.google.com',
      // 'https://studio.webcomponents.dev',
    ],
    
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest({ maxInstances: 10 }, (request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
