class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    if current_user.user_name == game_params[:userName]
      new_game = Game.new(game_params)
      new_game.user = current_user
      new_game.save
      status: :ok
    else
      status: :unauthorized
    end
  end

protected

  def game_params
    params.require(:game).permit(
      :clickMisses,
      :targetHits,
      :targetMisses,
      :targetTotal,
      :targetTimes => [],
      :gameType,
      :gameDifficulty,
      :gameTime,
      :clickTotal,
      :clickAccuracy,
      :targetAccuracy,
      :userName
    )
  end
end