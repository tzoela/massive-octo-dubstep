var express = require('express');
var exphbs  = require('express-handlebars');
var cache = require('memory-cache');
var subdomain = require('express-subdomain-handler');

var tumblrPosts = require('./lib/tumblrPosts');

var teamMembers = require('./data/teamMembers');
var gifwhes = require('./data/gifwhes');
var gishwhes = require('./data/gishwhes');

var app = express();
app.use(express.static('public'));
app.use(subdomain({ baseUrl: 'teamoxfordsnotbrogues.com', prefix: 'www', logger: true }) );


app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    res.set({
        'Cache-Control':'maxAge=3600 content=public',
        'X-Gish-Type': 'DinoMite',
        'Content-type': 'text/html'
    });
    next();
});

app.get('/www/:thesubdomain', function(req, res, next){

  // for the example url this will print 'mysubdomain'
  res.send(req.params.thesubdomain);

});

function cachedRender(req, res, next, partial, renderData, cacheTimeout, refresh) {
    cacheTimeout = cacheTimeout || 3600000;

    var cachedPage = cache.get(req.url);

    if(cachedPage) {
        console.log('use cached', req.url);
        res.send(cachedPage);
    } else if (refresh) {
        console.log('refresh', req.url);

        refresh(cache);
    } else {
        console.log('replenish', req.url);

        res.render(partial, renderData, function(err, content) {
            // Render handler
            if (err) return req.next(err);
            cache.put(req.url, content, cacheTimeout);
            res.send(content);
        });
    }
}

app.get('/showcase', function(req, res, next) {
    var cacheTimeout = 3600000;
    var maxNumberOfPosts ;

    cachedRender(req, res, next, 'partials/showcase', {}, cacheTimeout, function(cache) {
        tumblrPosts().asShowcase(maxNumberOfPosts, function(err, body) {
            if(err) {
                res.send('oops');
            }

            res.render('partials/showcase', {
                images: body
            }, function(err, content) {
                // Render handler
                if (err) return req.next(err);
                cache.put(req.url, content, cacheTimeout);
                res.send(content);
            });
        });
    });

});

app.get('/gifwhes', function(req, res, next) {

    cachedRender(req, res, next, 'partials/submissions', {
        submissions: gifwhes,
        title: 'GifWhes'
    });

});
app.get('/gishwhes', function(req, res, next) {

    cachedRender(req, res, next, 'partials/submissions', {
        submissions: gishwhes,
        title: 'GISHWHES'
    });

});

app.get('/about', function (req, res, next) {
    res.render('partials/about', {
        teamMember: teamMembers.members
    });
});

app.get('/', function (req, res, next) {
    cachedRender(req, res, next, 'partials/index');
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);

});
