class Item < ApplicationRecord
  has_many :payments
  belongs_to :society

  monetize :price_cents

  validates :name, presence: true
  validates :price_cents, presence: true
end
