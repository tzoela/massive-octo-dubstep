var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;

var MenuItem = require('./MenuItem.jsx');

var NavBar = React.createClass({
    getDefaultProps: function() {
        return {
            menuItems: [
            {uid: 'home', label: 'Home'},
            {uid: 'gifwhes', label: 'GifWhes'},
            {uid: 'gishwhes', label: 'GISHWHES'},
            {uid: 'showcase', label: 'Showcase'},
            {uid: 'about', label: 'About'}
            ]
        };
    },

    getInitialState: function() {
        return {
            activeMenuItemUid: this.props.active
        };
    },

    setActiveMenuItem: function(uid) {
        this.setState({activeMenuItemUid: uid});
    },

    render: function() {
        var menuItems = this.props.menuItems.map(function(menuItem) {
            return (
                <MenuItem active={this.state.activeMenuItemUid === menuItem.uid}
                    key={menuItem.uid}
                    onSelect={this.setActiveMenuItem}
                    uid={menuItem.uid}
                    label={menuItem.label}
                    />
            );
        }.bind(this));

        return (
            <Navbar brand='OxfordsNotBrogues' fixedTop inverse toggleNavKey={0}>
                <Nav left eventKey={0} id='navigation-bar'>
                    {menuItems}
                </Nav>
            </Navbar>
        );
    }
});

module.exports = NavBar;
