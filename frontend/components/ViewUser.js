import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ViewItem from './ViewItem'
import PaymentForm from './PaymentForm'

import * as Actions from '../actions/publicUserActions'

class ViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openedItem: null,
      success: false,
    }
  }
  componentDidMount() {
    this.props.dispatch(Actions.requestUser(this.props.params.nickname))
  }
  isAdmin() {
    return this.props.user.me && this.props.user.me.nickname === this.props.params.nickname
  }
  render() {
    const user = this.props.user

    if (this.props.isFetching){
      return <div/>
    }
    if (!user) {
      // TODO(Taimur)
      return (
        <p>invalid URL</p>
      )
    }
    const items = user.items.map(item => {
      return (<ViewItem item={item} key={item.id} onPayClicked={() => this.onPayClicked(item)}/>)
    })
    let success = null
    if (this.state.success) {
      success = (
        <p>SUCCESS</p>
      )
    }
    const openedItem = this.state.openedItem
    return (
      <div>
        {success}
      	<div className='ui cover'>
          <div className='ui text container center aligned middle'>
            <h1>{user.name}</h1>
          </div>
        </div>
        <div className='ui container centered item-list'>
        {items}
        </div>
        { openedItem ? <PaymentForm user={user} item={openedItem} onClose={() => this.onModalClose()} onSuccess={() => this.setState({success: true})}/> : null}
      </div>
    )
  }
  onPayClicked(item) {
    this.setState({ openedItem: item })
  }
  onModalClose() {
    this.setState({ openedItem: null })
  }
}

function mapStateToProps(state) {
  return state.publicUser
}

export default connect(mapStateToProps)(ViewUser)
