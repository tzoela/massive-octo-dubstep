var React = require('react');

var Submissions = require('./Submissions.jsx');
var whatIsgifWhes = (
  <span>
    GifWhes is a pre-GiShWheS mini-hunt held on Tumblr. See the
    <a href='http://officialgishwhes.tumblr.com/gifwhes'> official Gishwhes tumblr page </a>
    for more information.
  </span>
);
var GifWhes = React.createClass({
  render: function() {
    return (
      <div>
        <Submissions source="/api/gifwhes" bodyText={whatIsgifWhes} subtitle="Just a few of our favourite submissions" title="GifWhes"></Submissions>
      </div>
    );
  }
});
module.exports = GifWhes;
