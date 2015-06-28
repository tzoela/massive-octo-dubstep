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
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">OxfordsNotBrogues</a>
                    </div>
                    <div id="navbar" className="collapse nav-collapse navbar-collapse">
                        <ul className='nav navbar-nav'>
                            {menuItems}
                        </ul>
                    </div>
                </div>
            </nav>
            );
        }
    });
