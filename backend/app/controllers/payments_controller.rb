class PaymentsController < ApplicationController
  def client_token
    render json: { client_token: Braintree::ClientToken.generate }
  end

  def purchase
    @item = Item.find(params[:id])
    nonce = params[:payment_method_nonce]

    result = Braintree::Transaction.sale(
      :amount => @item.price.format(symbol: false),
      :payment_method_nonce => nonce
    )

    @payment = @item.payments.build(payment_params)

    if result.success? and @payment.valid?
      @payment.save!
      @item.society.balance += @item.price
      @item.society.save!
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
