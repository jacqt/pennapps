class CreateSocieties < ActiveRecord::Migration[5.0]
  def change
    create_table :societies do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :nickname
      t.string :auth_token

      t.timestamps
    end

    add_index :societies, :email, unique: true
    add_index :societies, :nickname, unique: true
  end
end
