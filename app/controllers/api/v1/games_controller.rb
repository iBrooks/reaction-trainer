class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    if current_user.user_name == params[:userName]
      new_game = Game.new(game_params)
      new_game.user = current_user
      new_game.save
      if new_game.gameType == 'Baseline'

      elsif new_game.gameType == 'Challenge'

      else

      end
      render json: {message: 'Game saved'}, status: :ok
    else
      render json: {message: 'Username does not match current user'}, status: :unauthorized
    end
  end
  def update_totals
    new_total_games
    current_user.update(
      total_games: new_total_games,
      total_hits: new_total_hits,
      average_hit: new_average_hit,
      total_clicks: new_total_clicks,
      total_accuracy: new_total_accuracy
    )
  end
protected

  def game_params
    params.require(:game).permit(:clickMisses, :targetHits, :targetMisses, :targetTotal, :gameType, :gameDifficulty, :gameTime, :clickTotal, :clickAccuracy, :targetAccuracy, :target_times => [])
  end
end