var React = require('react');
var Thumbnail = require('react-bootstrap').Thumbnail;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var ThumbWithModel = require('./ThumbWithModel.jsx');
var ImageItem = require('./ImageItem.jsx');

var SubmissionImage = React.createClass({
  render: function() {
    var comments;
    if (this.props.comments) {
      comments = this.props.comments.map(function(comment) {
        var key = Date.now() + comment;
        return (
          <div className="text-center" key={key}>{comment}</div>
        );
      });
    }

    var glyph;
    var award;
    if (this.props.award) {
      glyph = <Glyphicon glyph='star' title={this.props.award}/>
      award = <p>Awarded: {this.props.award}</p>;
    }
    var thumbtext = (
      <div>
        <h4>
          {glyph}Item #{this.props.itemNumber}</h4>
        {award}
      </div>
    );
    return (

      <Col lg={5} md={4} xs={6}>
        <Thumbnail src={this.props.imgUrl}>
          <ThumbWithModel thumbtext={thumbtext} titleText={this.props.description}>
            <ImageItem  altText="submission-Image" imgUrl={this.props.imgUrl}/>
            {comments}
          </ThumbWithModel>
        </Thumbnail>
      </Col>
    );
  }
});

module.exports = SubmissionImage;
