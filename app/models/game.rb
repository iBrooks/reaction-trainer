class Game < ApplicationRecord
  has_many :target_hits
  # belongs_to :user

  # validates :user_id, presence: false
end