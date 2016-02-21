import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import DialogItem from './itemStates/DialogItem'
import ArchivedItem from './itemStates/ArchivedItem'

import * as Actions from '../../actions/userActions'

class ArchiveView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      askForDelete: [],
    }
  }
  render() {
    const me = this.props.user
    const archivedItems = _.sortBy(me.items, 'created_at').filter(item => item.archived).map(item => {
      if (this.state.askForDelete.indexOf(item.id) > -1) {
        return <DialogItem key={item.id} question={'Are you sure you want to delete this item? This can\'t be undone.'} confirmTitle={'Delete'} confirm={() => this.onDelete(item.id)} abort={() => this.onAbortDeleteClicked(item.id)}/>
      }
      else {
        return <ArchivedItem item={item} key={item.id} onDelete={() => this.onDeleteClicked(item.id)} onUnarchive={() => this.onArchive(item.id,false)}/>
      }
    })
    const emptyView = (
      <div>
        <p>No archived items. You can archive items in the 'Your items' section. This removes them from your page but still allows you to see a record of payments.</p>
      </div>
    )
    return (
      <div className='twelve wide column left aligned'>
        <h1>Archived Items</h1>
        {archivedItems.length === 0 ? emptyView :
          <div>
            <p>If you delete an archived item, it is lost forever along with its payment record.</p>
            {archivedItems}
          </div>
        }
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
  return state.user
}

export default connect(mapStateToProps)(ArchiveView)
