var teamMembers = require('../data/teamMembers');

module.exports = function(app, cache) {
    var cachedRender = require('../lib/cachedRender')(cache);

    app.get('/about', function(req, res) {
        cachedRender(req, res, 'partials/about', {
            teamMember: teamMembers.members
        });
    });
};
