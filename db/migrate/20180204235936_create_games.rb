class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.belongs_to :user, null: true
      t.references :game_type
      t.integer :target_count
      t.integer :click_count
      t.string :difficulty
      t.timestamps
    end
  end
end
