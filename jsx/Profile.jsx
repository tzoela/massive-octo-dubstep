var React = require('react');
var BootStrap = require('react-bootstrap');
var Col = BootStrap.Col;
var Thumbnail = BootStrap.Thumbnail;
var Button = BootStrap.Button;

var Profile = React.createClass({
  getInitialState: function() {
    return {username: undefined};
  },

  componentDidMount: function() {
    $.get('/profile', function(result) {
        if (this.isMounted()) {
          try{
            this.setState({
              username:result.local.username,
              picture: result.local.picture
            });
          }catch (exception) {
            window.location = '/';
          }
        }
    }.bind(this));
  },

  render: function() {
    if(!this.state.username) {
      return <div />
    }

    return (
      <Col xs={6} md={3}>
        <Thumbnail src={this.state.picture}>
          <div>
            <p>user:  <strong>{this.state.username}</strong></p>
              <Button href="/logout">Logout</Button>
          </div>

        </Thumbnail>

      </Col>

      );
  }

});

module.exports = Profile;
