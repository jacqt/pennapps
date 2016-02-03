import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import Header from './Header'
import DashboardActions from './DashboardActions'

import * as Actions from '../actions/actions'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const me = this.props.me
    const index = _.findIndex(me.items, (item) => item.id == this.props.itemId)
    if (index === -1) return <div/>
    const item = me.items[index]
    const payments = item.payments.transactions.map(transaction => {
      return <tr><td>{transaction.name}</td><td>{transaction.email}</td><td>{transaction.created_at}</td></tr>
    })
    return (
      <div>
        <Header/>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>{me.name}</div>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>£315.00</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            <div className='twelve wide column left aligned'>
              <h1>Item Payments</h1>
              <table className="ui celled table">
              <thead>
                <tr><th>Name</th>
                <th>Email</th>
                <th>Payment Date</th>
              </tr></thead>
              <tbody>
              {payments}
              </tbody>
              </table>
            </div>
            <div className='four wide column right aligned'>
              <h1>Actions</h1>
              <DashboardActions from='archive'/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  onArchive(id,archived){
    const { dispatch } = this.props
    dispatch(Actions.archiveItem(id,archived))
    this.setState({askForArchive: _.without(this.state.askForArchive, id)})
  }
  onDelete(id) {
    const { dispatch } = this.props
    dispatch(Actions.removeItem(id))
  }
  onDeleteClicked(id) {
    this.setState({askForDelete: _.union(this.state.askForDelete, [id])})
  }
  onAbortDeleteClicked(id) {
    this.setState({askForDelete: _.without(this.state.askForDelete, [id])})
  }
  onAbortArchiveClicked(id) {
    this.setState({askForArchive: _.without(this.state.askForArchive, [id])})
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
