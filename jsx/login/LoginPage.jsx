var React = require('react');
var LoginForm = require('./LoginForm.jsx');
var BootStrap = require('react-bootstrap');
var Jumbotron = BootStrap.Jumbotron;
var Alert = BootStrap.Alert;
var Col = BootStrap.Col;

var LoginPage = React.createClass({

  render: function() {
    return (
      <Col md={6}>
      <Jumbotron>
        <Alert bsStyle='danger' >
          <LoginForm />
        </Alert>
      </Jumbotron>
    </Col>
    );
  }

});

module.exports = LoginPage;
