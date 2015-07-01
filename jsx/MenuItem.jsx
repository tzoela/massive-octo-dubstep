var React = require('react');
var NavItem = require('react-bootstrap').NavItem;

var MenuItem = React.createClass({
    handleClick: function(event) {
        this.props.onSelect(this.props.uid);
        if($('#navigation-bar').hasClass('in')) {
            $('.navbar-toggle').trigger('click');

        }
    },
    render: function() {
        var className = this.props.active ? 'active' : null;

        var route = '#' + this.props.uid;
        return (
            <NavItem
                onClick={this.handleClick}
                eventKey={0}
                className={className}
                key={this.props.uid}
                href={route}>
                {this.props.label}
            </NavItem>

        );
    }
});

module.exports = MenuItem;
