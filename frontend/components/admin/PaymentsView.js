import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

class PaymentsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const me = this.props.user
    const index = _.findIndex(me.items, (item) => item.id == this.props.itemId)
    if (index === -1) return <div/>
    const item = me.items[index]
    const payments = item.payments.transactions.map(transaction => {
      return (
        <tr>
          <td>{transaction.name}</td>
          <td>{transaction.email}</td>
          <td>{transaction.created_at}</td>
        </tr>
      )
    })
    return (
      <div className='twelve wide column left aligned'>
        <h1>Item Details</h1>
        <table className="ui celled table">
          <thead>
            <tr><th>Name</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{item.name}</td>
              <td>{item.price.price_formatted}</td>
              <td>{item.capacity}</td>
              <td>{item.remaining}</td>
            </tr>
          </tbody>
        </table>

        <h1>Item Payments</h1>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(PaymentsView)
