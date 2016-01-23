class ItemsController < ApplicationController
  before_action :authenticate_society, only: [:create, :update]
  before_action :set_item, only: [:update]

  def create
    @item = @society.items.build(item_params)
    if @item.save
      render json: { data: { item: @item.as_json } }, status: 201
    else
      render json: { status: "failure", errors: @item.errors }
    end
  end

  def update
    if @item.society != @society
      render json: { status: "failure" }, status: 401 and return
    else
      @item.attributes = item_params
      if @item.save
        render json: { data: { item: @item.as_json } }
      else
        render json: { status: "failure", errors: @item.errors }
      end
    end
  end

  private

  def item_params
    params.require(:item).permit(:name, :price, :capacity)
  end

  def set_item
    @item = Item.find(params[:id])
    if @item.nil?
      render json: { status: "failure" }, status: 401 and return
    end
  end
end
