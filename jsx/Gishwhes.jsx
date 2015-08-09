var React = require('react');
var ListItemStore = require('./stores/ListItemStore');
var BootStrap = require('react-bootstrap');
var Thumbnail = BootStrap.Thumbnail;
var Col = BootStrap.Col;
var Row = BootStrap.Row;
var Button = BootStrap.Button;
var Modal = BootStrap.Modal;

var EnbigenedImageModel = React.createClass({

  getInitialState: function() {
    return {
      showModal: false
    };
  },

  close: function() {
    this.setState({
      showModal: false
    });
  },

  open: function() {
    this.setState({
      showModal: true
    });
  },

  render: function() {

    return (
      <div>
        <h4>Item #{this.props.itemNumber}</h4>
        <p>{this.props.description}</p>
        <Button bsSize='medium' bsStyle='primary' onClick={this.open}>
          View Submission
        </Button>

        <Modal aria-labelledby='contained-modal-title-lg' bsSize='large' onHide={this.close} show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Item #{this.props.itemNumber}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.itemDisplay}
            {this.props.description}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

var Gishwhes = React.createClass({

  getInitialState: function() {
    return {
      list: ListItemStore.getMemberList()
    };
  },

  componentDidMount: function() {
    ListItemStore.addUpdateListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      list: ListItemStore.getMemberList()
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

  listItemsView: function() {
    return this.state.list.map(function(item, i) {
      var link = item.link;
      var isYoutube = this.linkIsYoutube(link);
      var itemDisplay;

      if (isYoutube) {
        link = this.generateYoutubeEmbeded(link);
        itemDisplay = (
            <iframe allowFullScreen className='col-centered' height={315} key={i} src={link} width={560}></iframe>
        );
       } else {
         itemDisplay = (
           <img className='img-rounded  submission-item col-centered'
             src={link} alt={'item submission for item ' + item.itemNumber}> </img>
         );
       }


      return (
        <Col lg={5} md={4} xs={6}>
          <Thumbnail src={this.props.imgUrl}>
            <EnbigenedImageModel description={item.description} itemDisplay={itemDisplay} itemNumber={item.itemNumber}/>
          </Thumbnail>
        </Col>

      );

    }.bind(this));
  },

  render: function() {
    var listItems = this.listItemsView();
    return (
        <div>
          <Row>
            <Col lg={5} md={4} xs={6}>
              <h4 style={{marginLeft: 20}}>Here are the items that we completed in this year's hunt</h4>
            </Col>
          </Row>
          <div>{listItems}</div>
        </div>
    );
  }
});

module.exports = Gishwhes;
