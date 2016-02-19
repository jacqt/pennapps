class Item < ApplicationRecord
  has_many :payments
  belongs_to :society

  monetize :price_cents

  validates :name, presence: true
  validates :price_cents, presence: true
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }

  validates_numericality_of :capacity, only_integer: true, greater_than_or_equal_to: 0, message: "capacity must be integral and nonnegative"
  validates_numericality_of :price, greater_than_or_equal_to: 0, message: "capacity must be integral and nonnegative"

  def payments_count
    self.payments.count
  end
end
