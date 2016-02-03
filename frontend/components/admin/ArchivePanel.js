import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import Header from './Header'
import DashboardActions from './DashboardActions'
import DialogItem from './itemStates/DialogItem'
import ArchivedItem from './itemStates/ArchivedItem'

import * as Actions from '../../actions/userActions'

class ArchivePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      askForDelete: [],
    }
  }
  render() {
    const me = this.props.user
    const archivedItems = me.items.filter(item => item.archived).map(item => {
      if (this.state.askForDelete.indexOf(item.id) > -1) {
        return <DialogItem key={item.id} question={'Are you sure you want to delete this item? This can\'t be undone.'} confirmTitle={'Delete'} confirm={() => this.onDelete(item.id)} abort={() => this.onAbortDeleteClicked(item.id)}/>
      }
      else {
        return <ArchivedItem item={item} key={item.id} onDelete={() => this.onDeleteClicked(item.id)} onUnarchive={() => this.onArchive(item.id,false)}/>
      }
    })
    // TODO(Taimur): style emty view
    const emptyView = (
      <div>
        <p>No archived items. You can archive items in the 'Your items' section.</p>
      </div>
    )
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
              <h1>Archived Items</h1>
              {archivedItems.length === 0 ? emptyView : archivedItems}
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
  onArchive(id, archived){
    const { dispatch } = this.props
    dispatch(Actions.archiveItem(id, archived))
  }
  onDelete(id) {
    const { dispatch } = this.props
    dispatch(Actions.removeItem(id))
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

export default connect(mapStateToProps)(ArchivePanel)
