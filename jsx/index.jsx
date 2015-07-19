var React = require('react');

var Pugsy = require('./Pugsy.jsx');
var GifWhes = require('./GifWhes.jsx');
var Gishwhes = require('./Gishwhes.jsx');
var Showcase = require('./Showcase.jsx');
var About = require('./About.jsx');
var NavBar = require('./NavBar.jsx');
var Profile = require('./Profile.jsx');
var LoginPage = require('./login/LoginPage.jsx');

var App = React.createClass({
  render: function () {
    var Child;
    switch (this.props.route) {
      case 'home': Child = Pugsy; break;
      case 'gifwhes': Child = GifWhes; break;
      case 'gishwhes': Child = Gishwhes; break;
      case 'showcase': Child = Showcase; break;
      case 'about': Child = About; break;
      case 'profile': Child = Profile; break;
      case 'login': Child = LoginPage; break;
      default: Child = Pugsy;
    }

    return (
        <Child/>
    )
  }
});

function render () {
  var route = window.location.hash.substr(1) || 'home';
  React.render(
      <div>
        <NavBar active={route}/>
        <App route={route} />
      </div>
      , document.body);
}
window.onhashchange = render;
render(); // render initially
