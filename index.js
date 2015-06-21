var expressServer = require('./lib/expressServer');
var router = require('./lib/router');
var setUpHeaders = require('./lib/setUpHeaders');

expressServer.use([setUpHeaders, router]);
expressServer.listen();
