var React = require('react');

var ImageItem = React.createClass({

    render: function() {
        return (
            <img  alt={this.props.altText} className="img-rounded col-centered submission-item" src={this.props.imgUrl}/>
        );
    }

});

module.exports = ImageItem;
