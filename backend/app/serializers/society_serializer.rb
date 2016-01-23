class SocietySerializer < ActiveModel::Serializer
  root :data
  attributes :society
  has_many :items, serializer: ItemSerializer, root: false

  def society
    {
      "id": object.id,
      "name": object.name,
      "nickname": object.nickname,
      "auth_token": object.auth_token,
      "email": object.email,
    }
  end
end
