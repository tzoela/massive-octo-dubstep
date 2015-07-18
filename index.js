var expressServer = require('./lib/expressServer');
var apiRouter = require('./lib/apiRouter');
var appRouter = require('./lib/appRouter');

expressServer.use([apiRouter, appRouter]);
expressServer.listen();
