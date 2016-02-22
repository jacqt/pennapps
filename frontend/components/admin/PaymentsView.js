import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'
//import * as moment from 'moment'
const moment = require('moment')
import classNames from 'classnames'
import { Link } from 'react-router'

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
          <td>{transaction.email}</td>
          <td>{moment(transaction.created_at).format('YYYY MM DD')}</td>
        </tr>
      )
    })
    return (
      <div className='twelve wide column left aligned'>
        <h1>Item Details</h1>
        <div className="ui card">
        <div className="content">
          <div className="header">{item.name}</div>
          <div className="meta">{item.price.price_formatted}</div>
          <div className="description">
            Sold {item.capacity-item.remaining} of {item.capacity}
          </div>
        </div>
        <Link to={'/'} className={classNames({'active': this.props.active === 'items'})}>
        <div className="ui bottom attached button">
          <i className="left arrow icon"></i>
          Back to Your Items
        </div>
        </Link>
      </div>
        <h1>Item Payments</h1>
        <table className="ui celled table">
          <thead>
            <tr>
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
