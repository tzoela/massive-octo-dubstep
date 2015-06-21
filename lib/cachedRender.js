module.exports = function(cache){
    return function(req, res, partial, renderData, cacheTimeout, refresh) {
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
    };
};
