var React = require('react');
var BootStrap = require('react-bootstrap');
var LoginForm = require('./LoginForm.jsx');
var NavItem = BootStrap.NavItem;
var Alert = BootStrap.Alert;
var Modal = BootStrap.Modal;
var Button = BootStrap.Button;

var LoginModal = React.createClass({

  getInitialState: function() {
    return {
      show: false
    };
  },

  close: function() {
    this.setState({
      show: false
    });
  },

  open: function() {
    this.setState({
      show: true
    });
  },

  render: function() {

    if (this.state.message) {
      var message = (
        <Alert bsStyle='warning'>
          this.state.message</Alert>
      );
    }

    var href = '#' + window.location.hash.substr(1);
    return (
      <NavItem bsSize='large' bsStyle='info' href={href} onClick={this.open}>

        {this.props.label}

        <Modal aria-labelledby='contained-modal-title' onHide={this.close} show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title'>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}

            <LoginForm />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </NavItem>
    );
  }
});

module.exports = LoginModal;
