class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    new_game = Game.create()
    game_params[:target_hits].each do |target_hit|
      TargetHit.create(ms: target_hit, game_id: new_game.id)
    end
  end

protected

  def game_params
    params.require(:game).permit(:target_hits => [])
  end
end