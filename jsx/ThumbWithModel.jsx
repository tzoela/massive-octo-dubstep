var React = require('react');
var BootStrap = require('react-bootstrap');
var Thumbnail = BootStrap.Thumbnail;
var Col = BootStrap.Col;
var Row = BootStrap.Row;
var Button = BootStrap.Button;
var Modal = BootStrap.Modal;

var ThumbWithModel = React.createClass({

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
        {this.props.thumbtext}
        <Button bsSize='medium' bsStyle='primary' onClick={this.open}>
          View Submission
        </Button>

        <Modal aria-labelledby='contained-modal-title-lg' bsSize='large' onHide={this.close} show={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.titleText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = ThumbWithModel;
