import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import * as ajax from '../../lib/ajax'

/*
 * BRAINTREE SDK reference:
 * https://developers.braintreepayments.com/reference/client-reference/javascript-v2-reference
 */
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
            <div id='paymenterror' className="ui negative message hidden transition">
              <p>Something went wrong :( </p></div>
            <input id="name" placeholder='Name'/>

            <input id="email" placeholder='Email'/>

            <hr/>

            <div id="card-number"></div>

            <div id="expiration-date"></div>
            <div id="cvv"></div>

            <button className="paybutton">
              {"Pay "+item.price.price_formatted}
            </button>
            
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
      $('#name').change(function(){
        $(this).removeClass('error');
      });
      $('#email').change(function(){
        $(this).removeClass('error');
      });

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
                "color": "rgb(208,2,27)",
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
            const nameElement = $('#name')
            const emailElement = $('#email')
            const name = nameElement.val()
            const email = emailElement.val()
            if(!name || !email){
              if (!name) {
                nameElement.addClass('error')
              }
              if (!email) {
                emailElement.addClass('error')
              }
              return
            }
            $('#paymentForm').addClass('loading')
            ajax.pay(name, email, item.id, nonce.nonce)
            .then(res => {
              console.log(res)
              if (res.data && res.data.payment) {
                $('.modal').modal('hide')
                that.props.onSuccess()
              }
              else {
                $('#paymenterror').removeClass('hidden').addClass('visible');
                $('#paymenterror').append(res.errors)
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
