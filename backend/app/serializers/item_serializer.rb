class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :capacity, :payments

  def payments
    if serialization_options[:admin]
      {
        transactions: object.payments,
        total: object.payments.count * object.price,
      }
    else
      nil
    end
  end
end
