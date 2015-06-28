var About = React.createClass({
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
                <div className="list-group-item">
                    <a className={className} href={person.website}>
                        <img className="bio-pic" src={person.image} width="32" height="32"/>
                        <div className="name-quote">{nameWithQuote}</div>
                    </a>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9">
                        <h1>We are OxfordsNotBrogues</h1>

                        <div className="lead">Some stuff about the team</div>
                        <p>This link: <a href="http://teamoxfordsnotbrogues.tumblr.com/">Team tumblr</a></p>

                        <h3>Meet the team:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="list-group bs-team">
                        <div className="col-md-6">
                            {team}
                        </div>
                    </div>
                </div>
            </div>

        );

    }
});
