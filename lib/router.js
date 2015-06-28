var gifwhesApi = require('../routes/api/gifwhes');
var gishwhesApi = require('../routes/api/gishwhes');
var showcaseApi = require('../routes/api/showcase');
var aboutApi = require('../routes/api/about');

module.exports = function(app) {
    'use strict';

    gifwhesApi(app);
    gishwhesApi(app);
    showcaseApi(app);
    aboutApi(app);
};
