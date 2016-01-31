class PaymentsController < ApplicationController
  def client_token
    render json: { client_token: Braintree::ClientToken.generate }
  end

  def purchase
    @item = Item.find(params[:id])
    nonce = params[:payment_method_nonce]
    # fix the amount
    result = Braintree::Transaction.sale(
      :amount => "100.00",
      :payment_method_nonce => nonce
    )

    @payment = @item.payments.build(payment_params)

    if result.success? and @payment.valid?
      @payment.save
      render json: { data: { payment: @payment } }
    else
      render json: { status: "failure" }, status: 400
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:name, :email)
  end
end
