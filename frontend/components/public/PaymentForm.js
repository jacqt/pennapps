import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import * as ajax from '../../lib/ajax'

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const user = this.props.user
    const item = this.props.item

    this.node = ReactDOM.findDOMNode(this)

    ReactDOM.render((
      <div className="ui modal">
        <div className="paymentModal">
          <div className="close" id="close"></div>
          <h2>{user.name}</h2>
          <h1>{item.name}</h1>
          <hr/>
          <form className='ui form' id="paymentForm">
            <input id="name" placeholder='Name'/>

            <input id="email" placeholder='Email'/>

            <hr/>

            <div id="card-number"></div>

            <div id="expiration-date"></div>
            <div id="cvv"></div>

            <input type="submit" className='paybutton' value={"Pay "+item.price.price_formatted}/>
            <div id='paymenterror' className="ui negative message transition hidden">
              <i className="close icon"></i>
              <div className="header">
                Something went wrong...
              </div>
              <p>Please check your details and try again.</p></div>
          </form>
        </div>
      </div>
    ), this.node, () => {
      $('#paymentForm').addClass('loading')
      $('#close').click(() => {
        $('.modal').modal('hide')
      })
      $('.modal').modal({
        onHidden: () => {
          this.props.onClose()
        }
      }).modal('show')

      ajax.getClientToken().then((res) => {
        const that = this
        braintree.setup(res.client_token, "custom", {
          id: "paymentForm",
          hostedFields: {
            styles: {
              "input": {
                "font-family": "Lato, sans-serif"
              },

              // Styling a specific field
              ".number": {
              },

              // Styling element state
              ":focus": {
              },
              ".valid": {
                "color": "rgb(106,191,13)"
              },
              ".invalid": {
                "color": "rgb(208,2,27)"
              },

              // Media queries
              // Note that these apply to the iframe, not the root window.
              "@media screen and (max-width: 700px)": {
                "input": {
                  "font-size": "11pt"
                }
              }
            },
            number: {
              selector: "#card-number",
              placeholder: 'Card number'
            },
            cvv: {
              selector: "#cvv",
              placeholder: 'CVV'
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: 'MM/YY'
            },
          },
          onReady: (integration) => {
            that.integration = integration
            $('#paymentForm').removeClass('loading')
          },
          onPaymentMethodReceived: (nonce, type, details) => {
            $('#paymentForm').addClass('loading')
            ajax.pay($('#name').val(), $('#email').val(), item.id, nonce.nonce)
            .then(res => {
              console.log(res)
              if (res.data && res.data.payment) {
                $('.modal').modal('hide')
                that.props.onSuccess()
              }
              else {
                $('#paymenterror').show();
                $('#paymentForm').removeClass('loading')
              }
            })
          }
        });
      });
    })
  }

  componentWillUnmount() {
    $('body .modals').remove()
    if (this.integration) {
      this.integration.teardown(() => {
        this.integration = null
      })
    }
  }

  render() {
    return <div/>
  }
}

export default PaymentForm
