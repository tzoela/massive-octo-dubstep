var NavBar = React.createClass({displayName: "NavBar",
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
                React.createElement(MenuItem, {active: this.state.activeMenuItemUid === menuItem.uid, 
                    key: menuItem.uid, 
                    onSelect: this.setActiveMenuItem, 
                    uid: menuItem.uid, 
                    label: menuItem.label}
                    )
            );
        }.bind(this));

        return (
            React.createElement("nav", {className: "navbar navbar-inverse navbar-fixed-top", role: "navigation"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("button", {id: "nav-expand-button", type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#navbar", "aria-expanded": "false", "aria-controls": "navbar"}, 
                            React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"}), 
                            React.createElement("span", {className: "icon-bar"})
                        ), 
                        React.createElement("a", {className: "navbar-brand", href: "/"}, "OxfordsNotBrogues")
                    ), 
                    React.createElement("div", {id: "navbar", className: "collapse nav-collapse navbar-collapse"}, 
                        React.createElement("ul", {className: "nav navbar-nav"}, 
                            menuItems
                        )
                    )
                )
            )
            );
        }
    });
