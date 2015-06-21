module.exports = function(app) {
    app.use(function(req, res, next) {
        res.set({
            'Cache-Control':'maxAge=3600 content=public',
            'X-Gish-Type': 'DinoMite',
            'Content-type': 'text/html'
        });
        next();
    });
};
