class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :capacity
end