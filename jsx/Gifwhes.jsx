var React = require('react');

var Submissions = require('./Submissions.jsx');
var GifWhes = React.createClass({
    render: function () {
        return (
            <div>
                <Submissions title="GifWhes" subtitle="Just a few of our favourite submissions" source="/api/gifwhes"></Submissions>
            </div>
        );
    }
});
module.exports = GifWhes;
