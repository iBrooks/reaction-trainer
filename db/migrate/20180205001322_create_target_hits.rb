class CreateTargetHits < ActiveRecord::Migration[5.1]
  def change
    create_table :target_hits do |t|
      t.belongs_to :game, null: false
      t.references :user, through: :game, null: true
      t.integer :ms, null: false
    end
  end
end
