var expressServer = require('./lib/expressServer');
var router = require('./lib/router');
var setUpHeaders = require('./lib/setupHeaders');

expressServer.use([setUpHeaders, router]);
expressServer.listen();
