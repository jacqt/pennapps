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
  fetchUser() {
    this.props.dispatch(Actions.requestUser(this.props.params.nickname))
  }
  componentDidMount() {
    this.fetchUser()
  }
  componentWillReceiveProps(nextProps) {
    const itemId = nextProps.params.itemId
    if (!itemId) return
    if (this.state.openedItem && this.state.openedItem.id === itemId) return
    const user = nextProps.user
    if (!user) return
    const items = user.items
    const index = _.findIndex(items, (item) => item.id == itemId)
    if (index === -1) return
    this.setState({ openedItem: items[index] })
  }
  render() {
    const user = this.props.user

    if (this.props.isFetching){
      return <div/>
    }
    if (!user) {
      return (
        <p>invalid URL</p>
      )
    }
    const items = user.items.filter(item => !item.archived).map(item => {
      return (<ViewItem item={item} key={item.id} onPayClicked={() => this.onPayClicked(item)}/>)
    })
    const emptyView = (
      <div><br/><p>Awh shucks! This society doesn&apos;t seem to have any items right now - check back later.</p><br/>
      <img src='http://www.jonathankettleborough.com/wp-content/uploads/2012/12/Please-sir-may-I-have-some-more.jpg'/></div>
    )
    let success = null
    if (this.state.success) {
      success = (
        <div className='paymentnotice paymentsuccess'>Your payment has been accepted!</div>
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
        {items.length ? items : emptyView}
        </div>
        { openedItem
        ? <PaymentForm user={user} item={openedItem} onClose={() => this.onModalClose()} onSuccess={() => this.paymentSuccessful()}/>
        : null
        }
      </div>
    )
  }
  paymentSuccessful() {
    this.fetchUser()
    this.setState({success: true})
  }
  onPayClicked(item) {
    this.setState({ openedItem: item })
    this.props.history.replaceState(null, '/' + this.props.params.nickname + '/' + item.id)
  }
  onModalClose() {
    this.setState({ openedItem: null })
    this.props.history.replaceState(null, '/' + this.props.params.nickname)
  }
}

function mapStateToProps(state) {
  return state.publicUser
}

export default connect(mapStateToProps)(ViewUser)
