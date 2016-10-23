import React, { Component } from 'react'
import * as cookie from 'js-cookie'

import { connect } from 'react-redux'
import { Link } from 'react-router'

import { DOMAIN } from '../../lib/urls'
import Header from './Header'
import SideBar from './SideBar'
import ItemsView from './ItemsView'
import ArchiveView from './ArchiveView'
import EditUser from './EditUser'
import PaymentsView from './PaymentsView'
import WithdrawView from './WithdrawView'

class AdminPanel extends Component {

  loginAsSociety(society) {
    console.log('Logging as a society', society);
    cookie.set('owner_email', this.props.user.email)
    cookie.set('email', society.email)
    window.location.href = DOMAIN;
  }

  renderSocietyCard(society) {
    return (
      <div className='dashboard-item society-item' key={society.id}>
        <div className='top'>
          <div className='name'>
            <b> { society.display_name } </b>
          </div>
          <img className='society-photo-url' src={society.profile_photo_url} />
          <button
            className='saveEdit'
            onClick={() => this.loginAsSociety(society)}>
            Login as me
          </button>
        </div>
      </div>
    );
  }

  renderSocietyCards(societies) {
    return societies.map((society) => {
      return this.renderSocietyCard(society);
    });
  }

  renderSelectSociety() {
    const me = this.props.user;
    const societyCards = this.renderSocietyCards(me.societies);

    return (
      <div>
        <Header/>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>{me.display_name}</div>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>{me.balance.balance_formatted}</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            <div className='twelve wide column left aligned' >
              { societyCards }
            </div>
          </div>
        </div>
      </div>
    );

  }

  render() {
    const me = this.props.user
    if (!me.society) {
      console.log("THIS GUY IS NOT A SOCIETY MEMBER");
      console.log(me);
      return this.renderSelectSociety();
    }

    const route = this.props.route
    let mainComponent = null
    let activeTab = null
    if (route.itemId) {
      mainComponent = <PaymentsView itemId={route.itemId}/>
      activeTab = 'payment'
    }
    else if (route.archive) {
      mainComponent = <ArchiveView/>
      activeTab = 'archive'
    }
    else if (route.edit) {
      mainComponent = <EditUser/>
      activeTab = 'edit'
    }
    else if (route.withdraw) {
      mainComponent = <WithdrawView/>
      activeTab = 'withdraw'
    }
    else {
      mainComponent = <ItemsView/>
      activeTab = 'items'
    }

    return (
      <div>
        <Header/>
        <div className='ui container'>
          <div className='ui two column stackable grid bottom aligned'>
            <div className='twelve wide column left aligned'>
              <div className='dashboard-name'>{me.name}</div>
              <Link to={`/${me.nickname}`} target="_blank"><button className="ui basic right labeled icon button viewpage">
                <i className="right arrow icon"></i>
                View Your Page
              </button></Link>
            </div>
            <div className='four wide column right aligned'>
              <h2>Balance</h2>
              <div className='dashboard-balance'>{me.balance.balance_formatted}</div>
            </div>
          </div>
          <hr/>
          <div className='ui two column stackable grid'>
            {mainComponent}
            <div className='four wide column right aligned'>
              <h1>Actions</h1>
              <SideBar active={activeTab}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(AdminPanel)
