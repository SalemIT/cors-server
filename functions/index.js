const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://localhost:4173',
      'http://localhost:5000',
      'http://localhost:1313',
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8000',
      'https://salem-wchost.web.app',
      'https://salem-wchost-svelte.web.app',
      'https://salem-wchost-svelte--beta-1ihhhi28.web.app',
      'https://us-central1-salem-wchost.cloudfunctions.net',
      'https://portal.salem.edu',
      'https://salem.edu',
      'https://www.salem.edu',
      'https://admin.portal.salem.edu',
      'https://wchost.salem.edu',
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
