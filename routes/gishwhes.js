var gifwhes = require('../data/gishwhes');

module.exports = function(app, cache) {
    var cachedRender = require('../lib/cachedRender')(cache);

    app.get('/gishwhes', function(req, res) {
        cachedRender(req, res, 'partials/submissions', {
            submissions: gifwhes,
            title: 'GISHWHES'
        });
    });
};
