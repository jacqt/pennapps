import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class SideBar extends Component {
  render() {
    const me = this.props.user
    return (
      <div className='dashboard-actions'>
        <Link to={'/'} className={classNames({'active': this.props.active === 'items'})}>
          Your Items
        </Link><br/>
        <Link to={'/'} query={ {archive: true} } className={classNames({'active': this.props.active === 'archive'})}>
          Archived Items
        </Link><br/>
        <Link to={`/${me.nickname}`} target="_blank">
          View Your Page
        </Link><br/>
        <Link to={'/'} query={ {edit: true} } className={classNames({'active': this.props.active === 'edit'})}>
          Account Settings
        </Link><br/>
        <Link to={'/'} query={ {withdraw: true} } className={classNames({'active': this.props.active === 'withdraw'})}>
          Withdraw Funds
        </Link><br/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(SideBar)
