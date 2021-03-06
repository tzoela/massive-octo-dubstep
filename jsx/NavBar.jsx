var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var LoginModal = require('./login/LoginModal.jsx');

var MenuItem = require('./MenuItem.jsx');

var NavBar = React.createClass({

    getInitialState: function() {
        return {
            activeMenuItemUid: this.props.active,
            navigation: {menuItems: []}
        };
    },

    componentDidMount: function () {
      $.get('/navigation', function(result) {
          if (this.isMounted()) {
              var newState = this.state;
              newState.navigation = result;
              this.setState(newState);
          }
      }.bind(this));
    },

    setActiveMenuItem: function(uid) {
        var newState = this.state;
        newState.activeMenuItemUid = uid;
        this.setState(newState);
    },

    render: function() {
        var menuItems = this.state.navigation.menuItems.map(function(menuItem) {

          var NavTagType = menuItem.type === 'Login'? LoginModal :  MenuItem;
          var onselect = menuItem.type === 'Login'? function() {console.log('login')} : this.setActiveMenuItem

            return (
                <NavTagType active={this.state.activeMenuItemUid === menuItem.uid}
                    key={menuItem.uid}
                    onSelect={onselect}
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
