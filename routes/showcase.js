module.exports = function(app, cache) {
    var tumblrPosts = require('../lib/tumblrPosts');
    var cachedRender = require('../lib/cachedRender')(cache);
    var cacheOutTumblr = require('../lib/cacheOutTumblr')(cachedRender);
    app.get('/showcase', function(req, res) {
        var cacheTimeout = 3600000;
        cacheOutTumblr(tumblrPosts().asShowcase, req, res, cacheTimeout, 'partials/showcase');
    });
};
