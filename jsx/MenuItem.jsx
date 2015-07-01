var MenuItem = React.createClass({
  handleClick: function(event) {
    this.props.onSelect(this.props.uid);
    if(!$('#nav-expand-button').hasClass('collapsed')) {
        $('#nav-expand-button').trigger('click');
    }
  },
  render: function() {
    var className = this.props.active ? 'active' : null;

    var route = '#' + this.props.uid;
    return (
        <li className={className}>
            <a href={route}
                onClick={this.handleClick}>
                {this.props.label}
            </a>
        </li>
    );
  }
});

module.exports = MenuItem;
