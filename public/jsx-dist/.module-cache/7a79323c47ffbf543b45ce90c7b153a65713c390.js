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
                        React.createElement("p", null, "This link: ", React.createElement("a", {href: "http://teamoxfordsnotbrogues.tumblr.com/"}, "Team tumblr")), 

                        React.createElement("h3", null, "Meet the team:")
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "list-group bs-team"}, 
                        React.createElement("div", {className: "col-md-6"}, 
                            team
                        )
                    )
                )
            )

        );

    }
});
