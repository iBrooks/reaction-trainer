class AddUserSuperlatives < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :fastest_baseline, :integer
    add_column :users, :fastest_baseline_hit,:integer
    add_column :users, :average_baseline_hit, :integer
    add_column :users, :baseline_accuracy, :float

    add_column :users, :longest_challenge, :integer
    add_column :users, :most_challenge_hits,:integer
    add_column :users, :average_challenge_hit, :integer
    add_column :users, :challenge_accuracy, :float

    add_column :users, :total_games, :integer
    add_column :users, :total_hits, :integer
    add_column :users, :average_hit, :integer
    add_column :users, :total_clicks, :integer
    add_column :users, :total_accuracy, :float
  end
end
