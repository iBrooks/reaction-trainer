class AddGamemodeSumsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :baseline_hit_sum, :integer
    add_column :users, :baseline_total_clicks, :integer
    add_column :users, :baseline_total_hits, :integer
    add_column :users, :baseline_games, :integer
    add_column :users, :challenge_hit_sum, :integer
    add_column :users, :challenge_total_clicks, :integer
    add_column :users, :challenge_total_hits, :integer
    add_column :users, :challenge_average_hit_count, :integer
    add_column :users, :challenge_games, :integer


    remove_column :users, :longest_challenge, :integer
  end
end
