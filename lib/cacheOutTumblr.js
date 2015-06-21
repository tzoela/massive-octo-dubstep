module.exports = function(cachedRender) {
    return function(howToTumble, req, res, cacheTimeout, partial, maxNumberOfPosts, excludedTags) {
        cachedRender(req, res, partial, {}, cacheTimeout, function(cache) {
            howToTumble(maxNumberOfPosts, function(err, body) {
                if(err) {res.send('oops');}

                res.render(partial, {
                    images: body
                }, function(err, content) {
                    // Render handler
                    if (err){ return req.next(err);}
                    cache.put(req.url, content, cacheTimeout);
                    res.send(content);
                });
            }, excludedTags);
        });
    };
};
