(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var About = React.createClass({displayName: "About",
    getInitialState: function() {
        return {
            people: [{
                "name": "Jennifer",
                "website": "http://i-dont-wike-it.tumblr.com/",
                "class": "fui-tumblr",
                "image": "https://igcdn-photos-h-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/10554148_1425160687779023_46641106_a.jpg",
                "quote": "Am I the only one who's itchy?"
            }]
        };
    },
    componentDidMount: function() {
        $.get('/api/about', function(result) {
            if (this.isMounted()) {
                this.setState({
                    people: result.members
                });
            }
        }.bind(this));
    },
    render: function() {

        var team = this.state.people.map(function(person) {

            var className ='team-member ' + person.class;
            var quote = person.quote ?  " - '" + person.quote + "'" : '';
            var nameWithQuote = person.name + quote;

            return (
                React.createElement("div", {className: "list-group-item"}, 
                    React.createElement("a", {className: className, href: person.website}, 
                        React.createElement("img", {className: "bio-pic", src: person.image, width: "32", height: "32"}), 
                        React.createElement("div", {className: "name-quote"}, nameWithQuote)
                    )
                )
            );
        });

        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-sm-9"}, 
                        React.createElement("h1", null, "We are OxfordsNotBrogues"), 

                        React.createElement("div", {className: "lead"}, "Some stuff about the team"), 
                        React.createElement("div", {className: "placeholder-from-jenjen"}, 
                            "like established this year, made up of experienced members from teams that previously didn't work out, goals for this year,  etc", React.createElement("br", null), 
                            "named because kingsman is fuckin awesome", React.createElement("br", null), 
                            "idk shit like that  -JenJen"
                        ), 
                        React.createElement("p", null, "This link: ", React.createElement("a", {href: "http://teamoxfordsnotbrogues.tumblr.com/"}, "Team tumblr")), 

                        React.createElement("h3", null, "Meet the team:")
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "list-group bs-team"}, 
                        React.createElement("div", {className: "col-md-9"}, 
                            team
                        )
                    )
                )
            )

        );

    }
});

module.exports = About;

},{}],2:[function(require,module,exports){
var Submissions = require('./Submissions.jsx');
var GifWhes = React.createClass({displayName: "GifWhes",
    render: function () {
        return (
            React.createElement(Submissions, {title: "GifWhes", source: "/api/gifwhes"})
        );
    }
});
module.exports = GifWhes;

},{"./Submissions.jsx":10}],3:[function(require,module,exports){
var Submissions = require('./Submissions.jsx');
var Gishwhes = React.createClass({displayName: "Gishwhes",
    render: function () {
        return (
            React.createElement(Submissions, {title: "GISHWHES", source: "/api/gishwhes"})
        );
    }
});


module.exports = Gishwhes;

},{"./Submissions.jsx":10}],4:[function(require,module,exports){
var MenuItem = React.createClass({displayName: "MenuItem",
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
        React.createElement("li", {className: className}, 
            React.createElement("a", {href: route, 
                onClick: this.handleClick}, 
                this.props.label
            )
        )
    );
  }
});

module.exports = MenuItem;

},{}],5:[function(require,module,exports){
var MenuItem = require('./MenuItem.jsx');

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

module.exports = NavBar;

},{"./MenuItem.jsx":4}],6:[function(require,module,exports){
var Pugsy = React.createClass({displayName: "Pugsy",
    render: function () {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("img", {src: "img/logo.jpg", width: "100%"})
            )
        );
    }
});

module.exports = Pugsy;

},{}],7:[function(require,module,exports){
var ShowcaseItems = require('./ShowcaseItems.jsx');

var Showcase = React.createClass({displayName: "Showcase",
    render: function() {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", null, 
                            React.createElement("h1", null, "Showcase")
                        )
                    ), 

                    React.createElement("div", {className: "showcase-grid"}, 
                        React.createElement(ShowcaseItems, {source: "/api/showcase"})
                    )
                )
            )
        );
    }
});

module.exports = Showcase;

},{"./ShowcaseItems.jsx":8}],8:[function(require,module,exports){
var ShowcaseItems = React.createClass({displayName: "ShowcaseItems",
    getInitialState: function() {
        return {
            images: [{
                url: '',
                height: 0,
                width:0
            }]
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    images: result
                });
                var $container = $('.showcase-grid');
                $container.packery({
                    itemSelector: '.showcase-grid-item',
                    gutter: 0
                });

                $('img.lazy').lazyload({
                    effect : 'fadeIn'
                });
            }
        }.bind(this));

    },
    render: function() {
        var images = this.state.images.map(function(image) {

            var height = image.height;// + 'px';
            var width = image.width;// + 'px';

            var classNames = 'img-rounded lazy showcase-grid-item ';

            var apsRatio = height/width;
            var givenWidth = 350;
            var ajustedHeight = apsRatio * givenWidth;


            if(image.url === '') {
                return (
                    React.createElement("img", {src: "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="})
                );
            } else {
                return (
                    React.createElement("img", {
                        key: image.url, 
                        className: "img-rounded lazy overflow min-350 showcase-grid-item", 
                        "data-original": image.url, 
                        width: givenWidth, 
                        height: ajustedHeight}
                        )
                );

            }

        })

        return (
            React.createElement("div", null, 
                images
            )
        );
    }
});
module.exports = ShowcaseItems;

},{}],9:[function(require,module,exports){
var SubmissionImage = React.createClass({displayName: "SubmissionImage",
    render: function () {
        var comments;
        if(this.props.comments) {
            comments = this.props.comments.map(function (comment) {
                return (
                    React.createElement("div", {className: "text-center"}, comment)
                );
            });
        }

        return (
            React.createElement("div", {className: "list-group-item"}, 
                React.createElement("div", {className: "text-center"}, 
                    this.props.description
                ), 
                React.createElement("img", {className: "img-rounded col-centered submission-item", src: this.props.imgUrl}), 
                comments
            )
        );
    }
});

module.exports = SubmissionImage;

},{}],10:[function(require,module,exports){
var SubmissionImage = require('./SubmissionImage.jsx');

var Submissions = React.createClass({displayName: "Submissions",
    getInitialState: function() {
        return {
            submissions: [{
                description: '',
                imgUrl: '',
                comments: ['']
            }]
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    submissions: result
                });
            }
        }.bind(this));
    },
    render: function() {
        var submissionImages = this.state.submissions.map(function(submission) {
            return (
                React.createElement(SubmissionImage, {
                    description: submission.description, 
                    key: submission.imgUrl, 
                    imgUrl: submission.imgUrl, 
                    comments: submission.comments}
                    )
            );
        });

        var hasSubmissions = submissionImages.length > 0;
        var submissionView = (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", null, 
                            React.createElement("h1", null, "From ", this.props.title)
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "list-group"}, 
                            React.createElement("div", null, 
                                submissionImages
                            )
                        )
                    )
                )
            )
        );

        var appol = (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("h1", null, "From ", this.props.title), 
                    React.createElement("div", {className: "row"}, 
                        "This page will contain all of our submissions from ", this.props.title
                    ), 
                    React.createElement("div", {className: "row"}, 
                        "It doesn't look like we have any yet (Because it hasn't started yet :P)"
                    )
                )

            )
        );

        return (
            hasSubmissions ? submissionView : appol
        );
    }
});
module.exports = Submissions;

},{"./SubmissionImage.jsx":9}],11:[function(require,module,exports){
var Pugsy = require('./Pugsy.jsx');
var GifWhes = require('./GifWhes.jsx');
var Gishwhes = require('./Gishwhes.jsx');
var Showcase = require('./Showcase.jsx');
var About = require('./About.jsx');
var NavBar = require('./NavBar.jsx');


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
  var route = window.location.hash.substr(1) || 'home';
  React.render(
      React.createElement("div", null, 
        React.createElement(NavBar, {active: route}), 
        React.createElement(App, {route: route})
      )
      , document.body);
}
window.onhashchange = render;
render(); // render initially

},{"./About.jsx":1,"./GifWhes.jsx":2,"./Gishwhes.jsx":3,"./NavBar.jsx":5,"./Pugsy.jsx":6,"./Showcase.jsx":7}]},{},[11]);
