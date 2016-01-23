import React, { Component, PropTypes } from 'react'
import { routeActions } from 'redux-simple-router'
import { connect } from 'react-redux'

import Header from './Header'
import DashboardItem from './DashboardItem'
import DashboardActions from './DashboardActions'

class App extends Component {
  render() {
    const { dispatch } = this.props
    return (
      <div>
        <Header></Header>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>Oxford University Islamic Society</div>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>£315.00</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            <div className='twelve wide column left aligned'>
              <h1>Your Items</h1>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>
              <DashboardItem name='Teddy Hall Formal' price='13.00' remaining='12' capacity='25'/>  
            </div>
            <div className='four wide column right aligned'>
              <h1>Actions</h1>
              <DashboardActions/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(App)
