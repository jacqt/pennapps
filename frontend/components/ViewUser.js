import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ViewItem from './ViewItem'
import PaymentForm from './PaymentForm'

import * as A from '../actions/actions'

class ViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openedItem: null,
      success: false,
    }
  }
  componentDidMount() {
    this.props.dispatch(A.requestUser(this.props.params.nickname))
  }
  isAdmin() {
    return this.props.user.me && this.props.user.me.nickname === this.props.params.nickname
  }
  render() {
    let user = this.props.user.watching
    if (this.isAdmin()) {
      user = this.props.user.me
    }

    if(!user){
      return (<div/>)
    }
    const items = user.items.map(item => {
      return (<ViewItem name={item.name} price={item.price} remaining='12' capacity={item.capacity} key={item.id} onPayClicked={() => this.onPayClicked(item)}/>)
    })
    let success = null
    if (this.state.success) {
      success = (
        <div className='paymentnotice paymentsuccess'>Success! Your payment has been accepted.</div>
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
          <div>
            {this.isAdmin() ? <Link to={'/'}>TODO BACK</Link> : null}
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
  return state
}

export default connect(mapStateToProps)(ViewUser)
