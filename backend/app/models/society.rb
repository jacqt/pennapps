class Society < ApplicationRecord
  has_secure_password
  has_many :items

  validates :email, presence: true
  validates :name, presence: true
end
