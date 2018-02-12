class UpgradeGames < ActiveRecord::Migration[5.1]
  def change
    add_column :games, :clickMisses, :integer
    add_column :games, :targetHits, :integer
    add_column :games, :targetMisses, :integer
    add_column :games, :targetTotal, :integer
    add_column :games, :gameType, :string
    add_column :games, :gameDifficulty, :string
    add_column :games, :gameTime, :string
    add_column :games, :clickTotal, :integer
    add_column :games, :clickAccuracy, :float
    add_column :games, :targetAccuracy, :float
  end
end
