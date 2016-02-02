import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import Header from './Header'
import DashboardItem from './DashboardItem'
import DashboardActions from './DashboardActions'
import NewItem from './NewItem'
import EditItem from './EditItem'
import DialogItem from './DialogItem'
import ArchivedItem from './ArchivedItem'

import * as Actions from '../actions/actions'

class AdminPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: [],
      askForArchive: [],
    }
  }
  render() {
    const me = this.props.me

    const items = me.items.filter(item => !item.archived).map(item => {
      if (this.state.editing.indexOf(item.id) > -1) {
        return <EditItem oldItem={item} title={'Save'} key={item.id} action={(name, price, capacity) => this.onUpdate(name, price, capacity, item.id)}/>
      }
      else if (this.state.askForArchive.indexOf(item.id) > -1) {
        return <DialogItem key={item.id} question={'Are you sure you want to archive this item?'} confirm={() => this.onArchive(item.id,true)} abort={() => this.onAbortArchiveClicked(item.id)} confirmTitle={'Archive'}/>
      }
      else {
       return <DashboardItem item={item} price={item.price} key={item.id} onEdit={() => this.onEditClicked(item.id)} onArchive={() => this.onArchiveClicked(item.id)}/>
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
              <DashboardActions from='admin'/>
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
  onArchive(id,archived){
    const { dispatch } = this.props
    dispatch(Actions.archiveItem(id,archived))
    this.setState({askForArchive: _.without(this.state.askForArchive, id)})
  }

  onEditClicked(id) {
    this.setState({editing: _.union(this.state.editing, [id])})
  }
  onArchiveClicked(id) {
    this.setState({askForArchive: _.union(this.state.askForArchive, [id])})
  }
  onAbortArchiveClicked(id) {
    this.setState({askForArchive: _.without(this.state.askForArchive, id)})
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
