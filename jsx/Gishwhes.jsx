var Submissions = require('./Submissions.jsx');
var Gishwhes = React.createClass({
    render: function () {
        return (
            <Submissions title="GISHWHES" source="/api/gishwhes"></Submissions>
        );
    }
});


module.exports = Gishwhes;
