class MoveTargetsToGame < ActiveRecord::Migration[5.1]
  def up
    drop_table :target_hits

    add_column :games, :target_times, :integer, array:true, default: []
  end
  def down
    remove_column :games, :target_times

    create_table :target_hits do |t|
      t.belongs_to :game, null: false
      t.references :user, through: :game, null: true
      t.integer :ms, null: false
    end
  end
end
