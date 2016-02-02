class CreateSocieties < ActiveRecord::Migration[5.0]
  def change
    create_table :societies do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :nickname
      t.string :auth_token
      t.integer :balance, default: 0

      t.timestamps
    end

    add_index :societies, :email, unique: true
    add_index :societies, :nickname, unique: true
    add_index :societies, :balance
  end
end
