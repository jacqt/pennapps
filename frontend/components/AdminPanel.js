import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import DashboardItem from './DashboardItem'
import DashboardActions from './DashboardActions'
import NewItem from './NewItem'

import * as Actions from '../actions/actions'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: []
    }
  }
  render() {
    const me = this.props.me

    const items = me.items.map(item => {
      if (this.state.editing.indexOf(item.id) > -1) {
        return <NewItem title={'Save'} key={item.id} action={(name, price, capacity) => this.onUpdate(name, price, capacity, item.id)}/>
      }
      else {
       return <DashboardItem name={item.name} price={item.price} remaining='12' capacity={item.capacity} key={item.id} onEdit={() => this.onEdit(item.id)}/>
      }
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
              <h1>Your Items</h1>
              {items}
              <NewItem title={'Add Item'} action={this.onAdd.bind(this)}/>
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
  onAdd(name, price, capacity) {
    const { dispatch } = this.props
    dispatch(Actions.addItem(name, price, capacity))
  }
  onUpdate(name, price, capacity, id) {
    const { dispatch } = this.props
    dispatch(Actions.updateItem(id, name, price, capacity))
  }
  onEdit(id) {
    let editing = this.state.editing.slice()
    editing.push(id)
    this.setState({editing: editing})
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
