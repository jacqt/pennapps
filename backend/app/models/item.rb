class Item < ApplicationRecord
  has_many :payments
  belongs_to :society

  validates :name, presence: true
  validates :price, presence: true
end
