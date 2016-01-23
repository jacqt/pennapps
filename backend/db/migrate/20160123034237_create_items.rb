class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :price
      t.integer :capacity
      t.references :society, index: true, foreign_key: true

      t.timestamps
    end
  end
end
