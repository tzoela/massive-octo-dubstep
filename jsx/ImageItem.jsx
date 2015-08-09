var React = require('react');

var ImageItem = React.createClass({

  render: function() {
    return (
      <a href={this.props.imgUrl} title="Click to Open">
        <img alt={this.props.altText} className="img-rounded col-centered submission-item" src={this.props.imgUrl}/>
      </a>
    );
  }

});

module.exports = ImageItem;
