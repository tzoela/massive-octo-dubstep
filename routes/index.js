module.exports = function(app, cache) {
    var cachedRender = require('../lib/cachedRender')(cache);

    app.get('/', function (req, res) {
        cachedRender(req, res, 'partials/index');
    });

};
