class AddHitSumToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :hit_sum, :integer
  end
end
