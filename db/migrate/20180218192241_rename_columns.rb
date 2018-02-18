class RenameColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :games, :gameType, :game_type
    rename_column :games, :gameTime, :game_time
    rename_column :games, :targetHits, :target_hits
  end
end
