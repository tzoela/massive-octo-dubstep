var showcaseRoute = require('../routes/showcase');
var gifwhesRoute = require('../routes/gifwhes');
var gishwhesRoute = require('../routes/gishwhes');
var aboutRoute = require('../routes/about');
var indexRoute = require('../routes/index');

module.exports = function(app, cache) {
    showcaseRoute(app, cache);
    gifwhesRoute(app, cache);
    gishwhesRoute(app, cache);
    aboutRoute(app, cache);
    indexRoute(app, cache);
};
