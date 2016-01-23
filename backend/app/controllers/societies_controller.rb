class SocietiesController < ApplicationController
  before_action :set_society, only: [:show, :update]
  before_action :authenticate_society, only: [:edit]

  def create
    society = Society.new(society_params)
    society.auth_token = SecureRandom.hex(256)

    if society.save
      render json: { status: "success", society: society }, status: 201
    else
      render json: { status: "failure", errors: society.errors }
    end
  end

  def show
    render json: { status: "success", society: @society }
  end

  def update
    @society.attributes = society_params
    if @society.save
      render json: { status: "success", society: @society }
    else
      render json: { status: "failure", errors: @society.errors }
    end
  end

  private

  def society_params
    params.require(:society).permit(:name, :email, :password, :password_confirmation, :nickname)
  end

  def set_society
    @society = Society.where(name: params[:name]).first
    if @society.nil?
      render json: { status: "failure" }, status: 404 and return
    end
  end
end
