class Item < ApplicationRecord
  belongs_to :society
  validates :name, presence: true
  validates :price, presence: true
end
