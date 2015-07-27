var React = require('react');
var Style = require('react-style');
var ListItemStore = require('./stores/ListItemStore');
var BootStrap = require('react-bootstrap');
var Col = BootStrap.Col;
var Thumbnail = BootStrap.Thumbnail;
var Button = BootStrap.Button;
var Input = BootStrap.Input;
var Modal = BootStrap.Modal;

var Styles = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  table: {
    width: '90%'
  },
  container: {
    width: '90%'
  },
  cell: {
    border: '2px solid #ccc',
    padding: 5
  },
  claimerPicture: {
    height: 50,
    width: 50
  }
};

var ListDisplay = React.createClass({

  getInitialState: function() {
    return {
      list: ListItemStore.getMemberList(),
      submittingItemNumber: -1,
      showInputLink: false
    };
  },

  componentDidMount: function() {
    ListItemStore.addUpdateListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      list: ListItemStore.getMemberList()
    });
  },

  claim: function(number) {

    return function() {
      $.ajax({
        method: 'put',
        url: '/claim',
        data: {
          itemNumber: number
        }
      }).done(function() {
        alert('claimed');
        window.location.reload();
      });
    };
  },

  goTo: function(link) {
    return function() {
      window.location = link;
    }
  },

  openLinkSubmit: function(itemNumber) {
    return function() {
        var newState = this.state;
        newState.submittingItemNumber = itemNumber;
        newState.showInputLink = true;
        this.setState(newState);

    }.bind(this);
  },

  closeInputLink: function() {
    var newState = this.state;
    newState.submittingItemNumber = -1;
    newState.showInputLink = false;
    this.setState(newState);
  },

  doSubmitItemLink: function() {
    var linkInput = this.refs.linkInput.getValue();
    var itemNumber = this.state.submittingItemNumber;

    $.ajax({
      method: 'put',
      url: '/submit',
      data: {
        itemNumber: itemNumber,
        link: linkInput
      }
    }).done(function() {
      alert('submitted');
      window.location.reload();
    }).error(function() {
        alert('oop');
    });
  },

  doRevokeClaim: function(itemNumber) {
    return function() {
      $.ajax({
        method: 'put',
        url: '/revokeclaim',
        data: {
          itemNumber: itemNumber
        }
      }).done(function() {
        alert('revoked');
        window.location.reload();
      }).error(function() {
          alert('oop');
      });
    }

  },

  noop: function(){},

  render: function() {

    var itemTableRows = this.state.list.map(function(item) {
      var claimedByThisUser = item.claimed && item.whoClaimed === window.user.username;

      var button1;
      if(item.claimed) {
        if(claimedByThisUser) {
          button1 = <Button bsStyle='warning' onClick={this.doRevokeClaim(item.itemNumber)}>Revoke claim</Button>;
        } else {
          button1 = <Button bsStyle='danger' onClick={this.claim(item.itemNumber)}>Steal</Button>;
        }
      } else {
        button1 = <Button bsStyle='primary' onClick={this.claim(item.itemNumber)}>Claim</Button>;
      }

      var button2;

      if(!item.completed) {
        if(claimedByThisUser) {
          button2 = <Button bsStyle='primary' onClick={this.openLinkSubmit(item.itemNumber)}>Submit</Button>
        } else {
          button2 = <Button bsStyle='primary' disabled>Submit</Button>;
        }
      } else {
        button1 = <Button bsStyle='primary' onClick={this.goTo(item.link)}>View</Button>;
        button2 = <Button bsStyle='primary' onClick={this.openLinkSubmit(item.itemNumber)}>Resubmit</Button>;
      }

      var claimer = 'X';
      if (item.claimed) {
        claimer = <img alt={item.whoClaimed} title={item.whoClaimed} src={item.claimerPicture} styles={[Styles.claimerPicture]}/>
      }

      var descriptionStyle;
      if(item.completed) {
        descriptionStyle = {
          textDecoration: 'line-through'
        }
      }
      
      return (
        <tr key={item._id}>
          <td className="col-md-1" styles={[Styles.cell]}>{claimer}</td>
          <td className="col-md-5" styles={[Styles.cell, descriptionStyle]}>{item.itemNumber}. {item.description}</td>
          <td className="col-md-1" styles={[Styles.cell]}>{button1}</td>
          <td className="col-md-1" styles={[Styles.cell]}>{button2}</td>
        </tr>
      );
    }.bind(this));

    var submitLinkButton = <Button bsStyle='primary' onClick={this.doSubmitItemLink}>Submit</Button>
    var inputLink = (
      <Modal aria-labelledby='contained-modal-title-sm' bsSize='large' onHide={this.closeInputLink} show={this.state.showInputLink}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-sm'>Submit Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Link for item {this.state.submittingItemNumber}: <small>(does not submit to gishwhes.com)</small>
          <Input buttonAfter={submitLinkButton} groupClassName='group-class' labelClassName='label-class' onChange={this.noop} placeholder='' ref='linkInput' type='text'/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeInputLink}>Close</Button>
        </Modal.Footer>
      </Modal>
    );

    return (
      <div styles={[Styles.center, Styles.container]}>
        {inputLink}
        <h1>Items List</h1>
        <h3>Choose your items:</h3>
        <table styles={[Styles.center, Styles.table]}>
          <thead>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            {itemTableRows}
          </tbody>
        </table>
      </div>

    );
  }

});

module.exports = ListDisplay;
