import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as ajax from '../lib/ajax'


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
          <h2>{user.name}</h2>
          <h1>{item.name}</h1>
          <hr/>
          <form id="paymentForm">
            <input id="name" placeholder='Name'/>

            <input id="email" placeholder='Email'/>

            <hr/>

            <div id="card-number"></div>

            <div id="expiration-date"></div>
            <div id="cvv"></div>

            <input type="submit" value={"Pay £"+item.price}/>
          </form>
        </div>
      </div>
    ), this.node, () => {
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
                "color": "blue"
              },
              ".valid": {
                "color": "green"
              },
              ".invalid": {
                "color": "red"
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
          },
          onPaymentMethodReceived: (nonce, type, details) => {
            // TODO show loading action
            ajax.pay($('#name').val(), $('#email').val(), item.id, nonce.nonce)
            .then(res => {
              console.log(res)
              if (res.data && res.data.payment) {
                $('.modal').modal('hide')
                that.props.onSuccess()
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
