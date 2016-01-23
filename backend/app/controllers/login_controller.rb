class LoginController < ApplicationController
  def login
    @society = Society.where(email: params[:email], auth_token: params[:auth_token]).first
    if @society.nil?
      render json: { status: "failure" }, status: 404 and return
    else
      render json: { status: "success", society: @society }
    end
  end
end
