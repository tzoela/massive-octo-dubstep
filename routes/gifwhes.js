var gifwhes = require('../data/gifwhes');

module.exports = function(app, cache) {
    var cachedRender = require('../lib/cachedRender')(cache);

    app.get('/gifwhes', function(req, res) {
        cachedRender(req, res, 'partials/submissions', {
            submissions: gifwhes,
            title: 'GifWhes'
        });
    });
};
