var tumblrPosts = require('../../lib/tumblrPosts');
var apicache = require('apicache').middleware;

module.exports = function(app) {
'use strict';
    app.get('/api/showcase', apicache('1 hour'),function(req, res) {

        function onSuccess(posts) {
            res.json(posts);
        }
        function onError(error) {
            console.log(error);
            res.json({errorMessage: error});
        }

        tumblrPosts().promised.asShowcase()
        .then(onSuccess, onError);

    });
};
