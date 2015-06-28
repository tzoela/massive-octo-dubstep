var App = React.createClass({displayName: "App",
  render: function () {
    var Child;
    switch (this.props.route) {
      case 'home': Child = Pugsy; break;
      case 'gifwhes': Child = GifWhes; break;
      case 'gishwhes': Child = Gishwhes; break;
      case 'showcase': Child = Showcase; break;
      case 'about': Child = About; break;
      default: Child = Pugsy;
    }

    return (
        React.createElement(Child, null)
    )
  }
});

function render () {
  var route = window.location.hash.substr(1);
  React.render(
      React.createElement("div", null, 
        React.createElement(NavBar, {active: route}), 
        React.createElement(App, {route: route})
      )
      , document.body);
}
window.onhashchange = render;
render(); // render initially
