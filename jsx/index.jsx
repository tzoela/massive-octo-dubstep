var App = React.createClass({
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
