class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    if current_user.user_name == params[:userName]
      new_game = Game.new(game_params)
      new_game.user = current_user
      new_game.save
      render json: {message: 'Game saved'}, status: :ok
    else
      render json: {message: 'Username does not match current user'}, status: :unauthorized
    end
  end

protected

  def game_params
    params.require(:game).permit(:clickMisses, :targetHits, :targetMisses, :targetTotal, :gameType, :gameDifficulty, :gameTime, :clickTotal, :clickAccuracy, :targetAccuracy, :target_times => [])
  end
end