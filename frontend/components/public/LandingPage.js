import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as Actions from '../../actions/userActions'

class LoginButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupLoading: false,
    }
  }
  
  loginWithFacebook() {
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        if (response.authResponse) {
          resolve(response.authResponse.accessToken);
        } else {
          reject("User cancelled login");
        }
      }, 'email,public_profile,user_friends');
    });
  }

  loginToCashew(facebookToken) {
    const { dispatch } = this.props
    const nickname = name.replace(/\s+/g, '')

    window.setTimeout(() => {
      dispatch(Actions.signupWithFacebookToken(facebookToken));
    }, 1000);
  }

  signup() {
    // fbq('track', 'CompleteRegistration');
    this.setState({ signupLoading: true })

    this.loginWithFacebook()
      .then((token) => this.loginToCashew(token))
      .catch(e => this.setState({signupLoading: false}))
  }

  render() {
    let buttonClassName = 'big ui positive cashew button';
    if (this.state.signupLoading) {
      buttonClassName += ' loading';
    }
    return (
      <button className={buttonClassName} onClick= { () => this.signup() }>
        <i className={"cashew icon"}>
          <img src={'img/cashew-icon-white.png'} />
        </i>
        SIGN IN WITH CASHEW
      </button>

    );
  }
}


class SignUpForm extends Component {
  render() {
    return (
      <div className={'ui form signup ' + (this.state.signupLoading ? 'loading' : '')}>
        <div className='field'>
          <input type="text" name="name" className='signupfield' placeholder="Society name" tabIndex='1'/>
        </div>
        <div className='field'>
          <input type="text" name="email" className='signupfield' placeholder="Email address" tabIndex='2'/>
        </div>
        <div className='field'>
          <input type="password" className='signupfield' name="password" placeholder="Password" tabIndex='3'/>
        </div>
        <button tabIndex='4' className="ui button signupbutton" onClick={() => this.signup($('input[name="name"]').val(),$('input[name="email"]').val(),$('input[name="password"]').val())}>
          Get Started
        </button>
      </div>
    );
  }
}

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signupLoading: false,
    }
  }

  signup(name, email, password) {
    fbq('track', 'CompleteRegistration');
    const { dispatch } = this.props
    const nickname = name.replace(/\s+/g, '')

    this.setState({ signupLoading: true })
    window.setTimeout(() => dispatch(Actions.signup(email, password, password, name, nickname)), 1000)
  }

  login(email, password) {
    const { dispatch } = this.props
    dispatch(Actions.login(email, password))
  }

  componentDidMount() {
    $(".loginfield").keyup(e => {
      if(event.keyCode == 13) {
        $(".loginbutton").click()
      }
    })
    $(".signupfield").keyup(e => {
      if(event.keyCode == 13){
        $(".signupbutton").click()
      }
    })
  }

  render() {
    let error = null
    if (this.props.error) {
      error = (
        <div className='errorbanner'>Something went wrong: {this.props.error.message}</div>
      )
    }
    let heading = 'Hate bank transfers? So do we.'
    if (this.props.referer === 'fb') {
      heading = 'Start accepting online payments.' // TODO(Taimur)
    }
    return (
      <div className='landingwrapper'>
        {error}
        <div className='masthead ui'>
          <div className='ui large top menu'>
            <div className='ui container'>
              <div className='logo item'><img src='img/oat.png' className='oat'/>oatpay</div>
              <div className='right item'>
                <div className='ui form login'>
                  <button tabIndex='7' className="ui button loginbutton" onClick={() => this.login($('input[name="login-email"]').val(),$('input[name="login-password"]').val())}>
                    Login
                  </button>
                  <div className='field'>
                    <input type="password" className='loginfield' tabIndex='6' name="login-password" placeholder="Password"/>
                  </div>
                  <div className='field'>
                    <input type="email" tabIndex='5' className='loginfield' name="login-email" placeholder="Email address"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='ui text container centered'>
            <h1>{heading}</h1>
            <h2>Oatpay lets your society accept online card payments in around 30 seconds. </h2>
            
            <LoginButton dispatch={this.props.dispatch} />
            <div className='convinced centere'>Not convinced?</div>
            <Link to='https://oatpay.com/CambridgeUniversityFlowerArrangingSociety' target="_blank"><button className='demo centered'>Check out a demo!</button></Link>
          </div>
        </div>

        <div className='ui row row2'>
          <p className='ui container text'>
            Oatpay was created by a group of Oxford and Cambridge students who were sick of having to do bank transfers to pay for things. It's a completely free service that we hope will benefit students and societies alike.
          </p>
        </div>

        <div className='ui row grid stackable life-easier'>
          <div className="ui eight wide column green-gradient">
            <div className='ui container centered'>
              <h3>Oatpay makes life easier for societies</h3>
              <p>Students are really bad at paying for things on time. This is annoying when your society’s selling event tickets/stash/anything. Why not make it easier for everyone by accepting debit cards? </p>
              <p>It takes literally 30 seconds to setup an account and add your first item/event. Your society gets its own Oatpay URL which you can send around, and students can pay for the items with their debit cards. </p>
            </div>
          </div>
          <div className="ui eight wide column red-gradient">
            <div className='ui container centered'>
              <h3>Oatpay makes life easier for students</h3>
              <p>Bank transfers are the worst thing ever. Who has time to login to online banking, dig out the card-reading machine thing, setup a new payee, enter the verification codes, and then scream in frustration when you get an error code? No one.</p>
              <p>Oatpay saves you from this pain. You just visit the payment page (hopefully linked from the Facebook event/email), enter your debit card details, and you’re done. </p>
            </div>
          </div>
        </div>

        <div className='ui row catch-fees'>
          <div className='ui container centered'>
            <h3>The only catch - card processing fees</h3>
            <p>{'Okay, here comes the annoying bit. It costs a small amount (20p + 1.9%) to process card payments. So if you’re a society that wants to sell a formal ticket for £12, your members will pay £12.43 by card instead.'}</p>
            <p>{'We’ve done some informal surveys and students have differing views on this. Some say “meh it’s 40p who cares”, while others are adamant that they would prefer to waste 5 minutes of their life doing a bank transfer than spend an excess 40p.'}</p>
            <p>{'The solution to this dilemma is simple. Give your students the option! If they want, they can save time and effort by using Oatpay, and pay the card transaction fee. If they’d rather not pay the 40p, they’re very welcome to bank transfer or pay in cash (which is probably what they’re doing anyway).'}</p>
            <p>{'There’s literally nothing to lose. Might as well give Oatpay a shot.'}</p>
            <p>{'Oh, and by the way, we don’t charge anything extra. At all. We made this website as a side-project over a weekend, and don’t care about making a penny from it. If university students end up using and liking Oatpay, then great - we’ve created something useful. That’s good enough for us.'}</p>
          </div>
        </div>

        <div className='ui row faq'>
          <div className='ui container centered'>
            <h3>Frequently Asked Questions</h3>
            <ol className='ui container'>
              <li>
                <div className='faq-question'><p>Is this legit?</p></div>
                <div className='faq-answer'>
                  <p>
                    Yes. Payments are processed using Stripe (<Link to='https://stripe.com'>www.stripe.com</Link>) - go check it out if you’re concerned. 
                    The names and Facebook links of the guys who made this website are also at the bottom of this page - you can hunt us down with pitchforks if it ends up being non-legit.
                  </p>
                </div>
              </li>


              <li>
                <div className='faq-question'><p>When and how will the money go into my society's bank account?</p></div>
                <div className='faq-answer'>
                  <p>
                    Good question. It takes around 1 working day from when the payment is made for the money to be available to withdraw. To withdraw money, just click the 'Withdraw' button on your account page. The money will be in your account within two working days from that point.
                  </p>
                </div>
              </li>


            </ol>
          </div>
        </div>

        <div className='ui row row-happy-users'>
          <h2 className='ui text container centered'>Some of our happy users...</h2>
          <div className='ui container society-logos centered'>
            <Link to='http://oxfordmicro.org/' target="_blank"><img src='img/omi-logo.png' className='society-logo omi'/></Link>
            <Link to='http://ouisoc.org/' target="_blank"><img src='img/isoc-logo.png' className='society-logo isoc'/></Link>
          </div>
        </div>
        <div className='ui row row-footer'>
          <div className='ui text container centered'> Built with love by <a href='https://www.facebook.com/Refrigerated'>Taimur</a>, <a href='https://www.facebook.com/lukaskoebis'>Lukas</a>, <a href='https://www.facebook.com/dvdhsu'>David</a> & <a href='https://www.facebook.com/ali.abdaal'>Ali</a>.<br />&#169; 2016 Oatpay Ltd. Company No. 09995457. Registered in England and Wales.<br /></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user
}

export default connect(mapStateToProps)(LandingPage)
