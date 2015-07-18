var React = require('react');
var BootStrap = require('react-bootstrap');
var NavItem = BootStrap.NavItem;
var Alert = BootStrap.Alert;
var Modal = BootStrap.Modal;
var Button = BootStrap.Button;

var Login = React.createClass({

  getInitialState: function() {
    return { show: false };
  },

  close: function() {
    this.setState({ show: false });
  },

  open: function() {
    console.log('open');
    this.setState({ show: true });
  },

  render: function() {

    if(this.state.message) {
      var message = (
         <Alert bsStyle='warning'> this.state.message</Alert>
      );
    }

    var href = '#' + window.location.hash.substr(1);
    return (
        <NavItem
          bsStyle='info'
          bsSize='large'
          onClick={this.open}
          href={href}>

          {this.props.label}

          <Modal
            show={this.state.show}
            onHide={this.close}
            aria-labelledby='contained-modal-title'>
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title'>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {message}
              <form action="/login" method="post">
              <div className="form-group">
                <label>Username</label>
                <input className="form-control" name="username" type="text" /></div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" name="password" type="password" /></div>

                  <button className="btn btn-lg" type="submit">Login</button>
                </form>

                <p>Need an account?<a href="/signup"> Signup</a></p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
        </NavItem>
        );
      }
    });

    module.exports = Login;
