var React = require('react');
var Style = require('react-style');
var ListItemStore = require('./stores/ListItemStore');

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
    height:50,
    width:50
  }
};

var ListDisplay = React.createClass({

  getInitialState: function() {
    return {
      list: ListItemStore.getMemberList()
    };
  },

  getStateFromStores: function() {
    return {
      list: ListItemStore.getItems(),
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

  revokeClaim: function() {},

  claim: function(number) {

    return function () {
      $.ajax({
        method: 'put',
        url: '/claim',
        data: {
          itemNumber: number,
          username: 'Joel'
        }
      }).done(function() {
        alert('claimed');
        window.location.reload();
      });
    };
  },

  render: function() {

    var itemTableRows = this.state.list.map(function(item) {
      var claimedByThisUser = false;//item.claimed && item.whoClaimed === 'Joel';

      var button1 = claimedByThisUser
        ? (
          <button onClick={this.revokeClaim}>'claimed'</button>
        )
        : (
          <button onClick={this.claim(item.itemNumber)}>'claim'</button>
        );

      var button2 = item.completed
        ? (
          <button>'view'</button>
        )
        : (
          <button>'submit'</button>
        );

      var claimer = 'X';
      if (item.claimed) {
        claimer = <img alt={item.whoClaimed} styles={[Styles.claimerPicture]} src={item.claimerPicture} />
      }

      return (
        <tr key={item._id}>
          <td styles={[Styles.cell]} className="col-md-1">{claimer}</td>
          <td styles={[Styles.cell]} className="col-md-5">{item.itemNumber}. {item.description}</td>
          <td styles={[Styles.cell]} className="col-md-1">{button1}</td>
          <td styles={[Styles.cell]} className="col-md-1">{button2}</td>
        </tr>
      );
    }.bind(this));

    return (
      <div styles={[Styles.center, Styles.container]}>
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
