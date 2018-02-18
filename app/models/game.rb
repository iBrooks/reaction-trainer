class Game < ApplicationRecord
  belongs_to :user

  validates :user, presence: false
  def accuracy
    :clickAccuracy
  end
end
