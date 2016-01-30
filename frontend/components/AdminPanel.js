import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import Header from './Header'
import DashboardItem from './DashboardItem'
import DashboardActions from './DashboardActions'
import NewItem from './NewItem'
import DeleteItem from './DeleteItem'

import * as Actions from '../actions/actions'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: [],
      askForDelete: [],
    }
  }
  render() {
    const me = this.props.me

    const items = me.items.map(item => {
      if (this.state.editing.indexOf(item.id) > -1) {
        return <NewItem oldItem={item} title={'Save'} key={item.id} action={(name, price, capacity) => this.onUpdate(name, price, capacity, item.id)}/>
      }
      else if (this.state.askForDelete.indexOf(item.id) > -1) {
        return <DeleteItem key={item.id} confirm={() => this.onDelete(item.id)} abort={() => this.onAbortDeleteClicked(item.id)}/>
      }
      else {
       return <DashboardItem item={item} price={item.price} key={item.id} onEdit={() => this.onEditClicked(item.id)} onDelete={() => this.onDeleteClicked(item.id)}/>
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
    this.setState({editing: _.without(this.state.editing, id)})
  }
  onDelete(id) {
    const { dispatch } = this.props
    dispatch(Actions.removeItem(id))
  }
  onEditClicked(id) {
    this.setState({editing: _.union(this.state.editing, [id])})
  }
  onDeleteClicked(id) {
    this.setState({askForDelete: _.union(this.state.askForDelete, [id])})
  }
  onAbortDeleteClicked(id) {
    this.setState({askForDelete: _.without(this.state.askForDelete, id)})
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
