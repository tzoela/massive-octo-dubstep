var MenuItem = React.createClass({
  handleClick: function(event) {
    this.props.onSelect(this.props.uid);
  },
  render: function() {
    var className = this.props.active ? 'active' : null;

    var route = '#' + this.props.uid;
    return (
        <li className={className}>
            <a href={route}
                onClick={this.handleClick}
                data-toggle="collapse"
                data-target=".nav-collapse">
                {this.props.label}
            </a>
        </li>
    );
  }
});
