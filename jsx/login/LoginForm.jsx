var React = require('react');

var LoginForm = React.createClass({

  render: function() {
    return (
      <form action="/login" method="post">
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" name="username" type="text"/></div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" name="password" type="password"/></div>

        <button className="btn btn-lg" type="submit">Login</button>
      </form>
    );
  }

});

module.exports = LoginForm;
