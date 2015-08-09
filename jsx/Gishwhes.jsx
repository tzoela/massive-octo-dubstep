var React = require('react');
var ListItemStore = require('./stores/ListItemStore');
var BootStrap = require('react-bootstrap');
var Thumbnail = BootStrap.Thumbnail;
var Col = BootStrap.Col;
var Row = BootStrap.Row;
var ThumbWithModel = require('./ThumbWithModel.jsx');
var ImageItem = require('./ImageItem.jsx');

var Gishwhes = React.createClass({

  getInitialState: function() {
    return {
      list: this.getCompleteItemsFromStore()
    };
  },

  getCompleteItemsFromStore: function(list) {
    var list = ListItemStore.getMemberList().filter(function(item) {
      return item.completed;
    });
    return list;
  },

  componentDidMount: function() {
    ListItemStore.addUpdateListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      list: this.getCompleteItemsFromStore()
    });
  },
  generateYoutubeEmbeded: function(shortYTLink) {
    var embededTemplate = 'https://www.youtube.com/embed/{id}';
    var idStart = shortYTLink.lastIndexOf('/');
    var id = shortYTLink.substring(idStart);

    return embededTemplate.replace('{id}', id);
  },

  linkIsYoutube: function(link) {
    return (link.indexOf('youtu.be') !== -1);
  },

  generateVideoView: function(link) {
    link = this.generateYoutubeEmbeded(link);
    return (
      <iframe allowFullScreen className='col-centered' height={315} src={link} width={560}></iframe>
    );
  },
  generateImageView: function(link, altText) {
    return (
      <ImageItem altText={altText} imgUrl={link}></ImageItem>
    );
  },

  listItemsView: function() {
    return this.state.list.map(function(item, i) {
      var title = 'Item #' + item.itemNumber;
      var link = item.link;
      var isYoutube = this.linkIsYoutube(link);
      var itemDisplay = isYoutube
        ? this.generateVideoView(link)
        : this.generateImageView(link, 'item submission for item ' + item.itemNumber);

      var thumbtext = (
        <div>
          <h4>{title}</h4>
          <p>{item.description}</p>
        </div>
      );

      return (
        <Col key={i + link} lg={6} md={9} sm={10} xs={10}>
          <Thumbnail bsSize='medium' src={this.props.imgUrl}>
            <ThumbWithModel thumbtext={thumbtext} titleText={title}>
              {itemDisplay}
              {item.description}
            </ThumbWithModel>
          </Thumbnail>
        </Col>
      );

    }.bind(this));
  },

  render: function() {
    var listItems = this.listItemsView();
    var Style = {
      container: {
        width: '70%'
      },
      title: {
        marginLeft: 20
      }
    }
    return (
      <div className='col-centered' style={Style.container}>
        <Row>
          <Col lg={10} md={10} xs={10}>
            <h4 style={Style.title}>Here are the items that we completed in this year's hunt</h4>
          </Col>
        </Row>
        <div>{listItems}</div>
      </div>
    );
  }
});

module.exports = Gishwhes;
