import React, { Component } from 'react'

import { connect } from 'react-redux'

import Header from './Header'
import SideBar from './SideBar'
import ItemsView from './ItemsView'
import ArchiveView from './ArchiveView'
import PaymentsView from './PaymentsView'
import WithdrawView from './WithdrawView'

class AdminPanel extends Component {
  render() {
    const route = this.props.route
    let mainComponent = null
    let activeTab = null
    if (route.itemId) {
      mainComponent = <PaymentsView itemId={route.itemId}/>
      activeTab = 'payment'
    }
    else if (route.archive) {
      mainComponent = <ArchiveView/>
      activeTab = 'archive'
    }
    else if (route.withdraw) {
      mainComponent = <WithdrawView/>
      activeTab = 'withdraw'
    }
    else {
      mainComponent = <ItemsView/>
      activeTab = 'items'
    }

    const me = this.props.user
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
              <div className='dashboard-balance'>{me.balance.balance_formatted}</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            {mainComponent}
            <div className='four wide column right aligned'>
              <h1>Actions</h1>
              <SideBar active={activeTab}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
