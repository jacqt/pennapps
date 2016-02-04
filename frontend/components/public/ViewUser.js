import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as _ from 'underscore'

import ViewItem from './ViewItem'
import PaymentForm from './PaymentForm'

import * as Actions from '../../actions/publicUserActions'

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
  componentWillReceiveProps(nextProps) {
    const itemId = this.props.params.itemId
    if (!itemId) return
    const user = nextProps.user
    if (!user) return
    const items = user.items
    const index = _.findIndex(items, (item) => item.id == itemId)
    if (index === -1) return
    delete this.props.params.itemId
    this.setState({ openedItem: items[index] })
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
        </div>
        <div className='ui container centered item-list'>
        {items}
        </div>
        { openedItem ? <PaymentForm user={user} item={openedItem} onClose={() => this.onModalClose()} onSuccess={() => this.paymentSuccessful()}/> : null}
      </div>
    )
  }
  paymentSuccessful() {
    this.setState({success: true})
    document.setTimeout(() => this.setState({success: false}), 5000)
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
