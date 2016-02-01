class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name
      t.boolean :archived, default: false
      t.integer :price
      t.integer :capacity, default: 0
      t.references :society, index: true, foreign_key: true

      t.timestamps
    end
  end
end
