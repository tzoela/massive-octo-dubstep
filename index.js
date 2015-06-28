var expressServer = require('./lib/expressServer');
var router = require('./lib/router');

expressServer.use([router]);
expressServer.listen();
