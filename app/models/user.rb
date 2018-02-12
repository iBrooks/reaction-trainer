class User < ApplicationRecord
  has_many :games
  validates :user_name, presence: true, uniqueness: true, format: { with: /\A\S+\z/, message: 'can\'t have whitespace' }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
