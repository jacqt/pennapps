class SocietiesController < ApplicationController
  before_action :set_society, only: [:show, :update]
  before_action :authenticate_society, only: [:update]

  def create
    @society = Society.new(society_params)
    @society.auth_token = SecureRandom.hex(256)

    if @society.save
      render json: @society, status: 201, include: [:items]
    else
      render json: { status: "failure", errors: @society.errors }
    end
  end

  def show
      render json: @society, include: [:items]
  end

  def update
    @society.attributes = society_params
    if @society.save
      render json: @society, include: [:items]
    else
      render json: { status: "failure", errors: @society.errors }
    end
  end

  private

  def society_params
    params.require(:society).permit(:name, :email, :password, :password_confirmation, :nickname)
  end

  def set_society
    @society = Society.where(nickname: params[:nickname]).first
    if @society.nil?
      render json: { status: "failure" }, status: 404 and return
    end
  end
end
