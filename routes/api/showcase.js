var tumblrPosts = require('../../lib/tumblrPosts');
var apicache = require('apicache').middleware;

module.exports = function(app) {
'use strict';
    app.get('/api/showcase', apicache('1 hour'),function(req, res) {

        tumblrPosts().asShowcase(undefined, function(error, body) {
            if(error) {console.log(error);}
            res.json(body);
        });

    });
};
