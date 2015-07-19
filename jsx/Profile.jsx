var React = require('react');
var BootStrap = require('react-bootstrap');
var Col = BootStrap.Col;
var Thumbnail = BootStrap.Thumbnail;
var Button = BootStrap.Button;
var Input = BootStrap.Input;
var Modal = BootStrap.Modal;
var Style = require('react-style');

var Styles = {
  center : {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  div: {
    width: '90%'
  },
  col: {
    width: '100%'
  }
}

var Profile = React.createClass({
  getInitialState: function() {
    return {
      user: {},
      showPasswordConfirm: false
    };
  },

  componentDidMount: function() {
    this.syncStateFromServer();
  },

  syncStateFromServer: function() {
    $.get('/profile', function(result) {
      if (this.isMounted()) {
        try {
          var newState = this.state;
          newState.user = result.local;
          newState.picture = result.local.picture;
          this.setState(newState);
        } catch (exception) {
          window.location = '/';
        }
      }
    }.bind(this));
  },

  updateQuote: function() {
    var newState = this.state;
    newState.updating = 'quote';

    this.showPasswordConfirm();
  },

  updatePicture: function() {
    var newState = this.state;
    newState.updating = 'picture';

    this.showPasswordConfirm();
  },

  showPasswordConfirm: function() {
    var newState = this.state;
    newState.showPasswordConfirm = true;
    this.setState(newState);
  },

  closePasswordConfirm: function() {
    var newState = this.state;
    newState.showPasswordConfirm = false;
    this.setState(newState);
  },

  doUpdate: function() {
    var password = this.refs.passInput.getValue();
    var username = this.state.user.username;
    var updatekey = this.state.updating;
    var updatevalue = this.state.user[updatekey];

    this.closePasswordConfirm();

    $.ajax({
      method: 'put',
      url: '/update',
      data: {
        username: username,
        password: password,
        updatekey: updatekey,
        updatevalue: updatevalue
      }
    }).done(function() {
      this.syncStateFromServer();

      alert('changes saved');

    }.bind(this));

  },

  noop: function(){},

  pictureChange: function() {
    var newState = this.state;
    newState.user.picture = this.refs.pictureInput.getValue();
    this.setState(newState);
  },

  quoteChange: function() {
    var newState = this.state;
    newState.user.quote = this.refs.quoteInput.getValue();
    this.setState(newState);
  },

  render: function() {
    if (!this.state.user.username) {
      return <div/>
    }

    var updateQuoteButton = <Button onClick={this.updateQuote}>Update</Button>
    var updatePictureButton = <Button onClick={this.updatePicture}>Update</Button>

    var passwordButton = <Button onClick={this.doUpdate}>Update</Button>
    var confirmBox = (
      <Modal show={this.state.showPasswordConfirm} onHide={this.closePasswordConfirm}  aria-labelledby='contained-modal-title-sm' bsSize='small'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-sm'>Confirm Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password:
          <Input buttonAfter={passwordButton}
            groupClassName='group-class'
            labelClassName='label-class'
            placeholder=''
            ref='passInput'
            type='password'
            onChange={this.noop}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closePasswordConfirm}>Close</Button>
        </Modal.Footer>
      </Modal>
    );



    return (
      <div styles={[Styles.center,Styles.div]}>
          {confirmBox}
          <Col styles={[Styles.center, Styles.col]} md={8} xs={9}>


          <Thumbnail src={this.state.picture}>
            <div>
              <p>user:
                <strong>{this.state.user.username}</strong>
              </p>

              <Input buttonAfter={updateQuoteButton}
                groupClassName='group-class'
                labelClassName='label-class'
                placeholder='Quote'
                ref='quoteInput'
                type='text'
                onChange={this.quoteChange}
                value={this.state.user.quote}/>

              <Input buttonAfter={updatePictureButton}
                groupClassName='group-class'
                labelClassName='label-class'
                placeholder='Picture'
                ref='pictureInput'
                type='text'
                onChange={this.pictureChange}
                value={this.state.user.picture}/>

              <Button href="/logout">Logout</Button>
            </div>

          </Thumbnail>

        </Col>
      </div>
    );
  }

});

module.exports = Profile;
