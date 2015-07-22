var React = require('react');
var TeamMemberStore = require('./stores/TeamMemberStore');

var About = React.createClass({
  getInitialState: function() {
    return TeamMemberStore.getMemberList();
  },

  componentDidMount: function() {
    TeamMemberStore.addUpdateListener(this._onChange);
  },

  _onChange: function() {
    this.setState(TeamMemberStore.getMemberList());
  },

  render: function() {

    var team = this.state.members.map(function(person) {

      var className = 'team-member ' + person.siteIcon;
      var title = person.website || '';

      var quote = '';

      if (person.quote) {
        quote = ' - \'' + person.quote + '\'';
      }

      var nameWithQuote = person.name + quote;

      return (
        <div key={person.name} className="list-group-item" title={title}>
          <a className={className} href={person.site}>
            <img alt={person.name + '_image'} className="bio-pic" height="32" src={person.picture} width="32"/>
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
              like established this year, made up of experienced members from teams that previously didn't work out, goals for this year, etc<br/>
              named because kingsman is fuckin awesome<br/>
              idk shit like that -JenJen
            </div>
            <p>This link:
              <a href="http://teamoxfordsnotbrogues.tumblr.com/">Team tumblr</a>
            </p>

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
