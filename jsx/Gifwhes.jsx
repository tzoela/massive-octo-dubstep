var Submissions = require('./Submissions.jsx');
var GifWhes = React.createClass({
    render: function () {
        return (
            <Submissions title="GifWhes" source="/api/gifwhes"></Submissions>
        );
    }
});
module.exports = GifWhes;
