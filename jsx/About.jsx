var React = require('react');
var About = React.createClass({
    getInitialState: function() {
        return {
            people: [{
                "name": '',
                "website": '',
                "class": '',
                "image": '',
                "quote": ''
            }]
        };
    },

    componentDidMount: function() {
        $.get('/api/about', function(result) {
            if (this.isMounted()) {
                var newState = this.state;
                newState.people = result.members;
                this.setState(newState);
            }
        }.bind(this));

    },
    
    render: function() {

        var team = this.state.people.map(function(person) {

            var className ='team-member ' + person.siteIcon;
            var title = person.website || '';

            var quote = '';

            if(person.quote) {
                if(typeof person.quote === 'object') {
                    person.quote = person.quote[Math.floor(Math.random() * person.quote.length)];
                    title += ' a special little snowflake';
                }
                quote = ' - \'' + person.quote + '\'';

            }

            var nameWithQuote = person.name + quote;

            return (
                <div className="list-group-item" title={title}>
                    <a className={className} href={person.site}>
                        <img className="bio-pic" alt={person.name + '_image'} src={person.picture} width="32" height="32"/>
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
                        <div className="placeholder-from-jenjen">
                            like established this year, made up of experienced members from teams that previously didn't work out, goals for this year,  etc<br/>
                            named because kingsman is fuckin awesome<br/>
                            idk shit like that  -JenJen
                        </div>
                        <p>This link: <a href="http://teamoxfordsnotbrogues.tumblr.com/">Team tumblr</a></p>

                        <h3>Meet the team:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="list-group bs-team">
                        <div className="col-md-9">
                            {team}
                        </div>
                    </div>
                </div>
            </div>

        );

    }
});

module.exports = About;
