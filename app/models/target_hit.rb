class TargetHit < ApplicationRecord
  belongs_to :game
  has_one :user, through: :game

  validates :ms, presence: true
end