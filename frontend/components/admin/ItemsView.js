import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import ViewItem from './itemStates/ViewItem'
import NewItem from './itemStates/NewItem'
import EditItem from './itemStates/EditItem'
import DialogItem from './itemStates/DialogItem'

import * as Actions from '../../actions/userActions'

class ItemsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: [],
      askForArchive: [],
    }
  }
  render() {
    const me = this.props.user

    const items = _.sortBy(me.items, 'created_at').filter(item => !item.archived).map(item => {
      if (this.state.editing.indexOf(item.id) > -1) {
        return <EditItem oldItem={item} title={'Save'} key={item.id} action={(name, price, capacity) => this.onUpdate(name, price, capacity, item.id)} abort={() => this.onAbortEditClicked(item.id)}/>
      }
      else if (this.state.askForArchive.indexOf(item.id) > -1) {
        return <DialogItem key={item.id} question={'Are you sure you want to archive this item?'} confirm={() => this.onArchive(item.id,true)} abort={() => this.onAbortArchiveClicked(item.id)} confirmTitle={'Archive'}/>
      }
      else {
       return <ViewItem item={item} userName={me.nickname} key={item.id} onEdit={() => this.onEditClicked(item.id)} onArchive={() => this.onArchiveClicked(item.id)}/>
      }
    })
    return (
      <div className='twelve wide column left aligned'>
        <h1>Your Items</h1>
        {items}
        <NewItem title={'Add Item'} action={this.onAdd.bind(this)}/>
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
  onAbortEditClicked(id) {
    this.setState({editing: _.without(this.state.editing, id)})
  }
  onArchiveClicked(id) {
    this.setState({askForArchive: _.union(this.state.askForArchive, [id])})
  }
  onAbortArchiveClicked(id) {
    this.setState({askForArchive: _.without(this.state.askForArchive, id)})
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(ItemsView)
