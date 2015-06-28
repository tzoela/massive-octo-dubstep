var MenuItem = React.createClass({displayName: "MenuItem",
  handleClick: function(event) {
    this.props.onSelect(this.props.uid);
  },
  render: function() {
    var className = this.props.active ? 'active' : null;

    var route = '#' + this.props.uid;
    return (
        React.createElement("li", {className: className}, 
            React.createElement("a", {href: route, 
                onClick: this.handleClick, 
                "data-toggle": "collapse", 
                "data-target": ".nav-collapse"}, 
                this.props.label
            )
        )
    );
  }
});
