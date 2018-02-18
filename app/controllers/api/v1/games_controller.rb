class Api::V1::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    if current_user.user_name == params[:userName]
      new_game = Game.new(game_params)
      new_game.user = current_user
      new_game.save
      update_totals(new_game.targetHits, new_game.clickTotal, new_game.target_times)
      if new_game.gameType == 'Baseline'
        update_baseline(new_game.targetHits, new_game.clickTotal, new_game.target_times, new_game.gameTime)
      else new_game.gameType == 'Challenge'
        update_challenge(new_game.targetHits, new_game.clickTotal, new_game.target_times)
      end
      render json: {message: 'Game saved'}, status: :ok
    else
      render json: {message: 'Username does not match current user'}, status: :unauthorized
    end
  end
  def show
    if current_user
      render json: current_user
    else
      render json: {message: 'not logged in'}, status: :unauthorized
    end
  end


  def update_baseline(total_hits, total_clicks, target_times, gameTime)
    new_baseline_games = current_user.baseline_games.to_i + 1
    new_baseline_total_hits = current_user.baseline_total_hits.to_i + total_hits
    new_baseline_hit_sum = current_user.baseline_hit_sum.to_i + target_times.sum
    new_average_baseline_hit = (new_baseline_hit_sum.to_f/new_baseline_total_hits.to_f).round
    new_baseline_total_clicks = current_user.baseline_total_clicks.to_i + total_clicks
    new_baseline_accuracy = ((new_baseline_total_hits.to_f/new_baseline_total_clicks.to_f) * 100).round(1)
    new_fastest_baseline = current_user.fastest_baseline
    if (new_fastest_baseline == nil)
      new_fastest_baseline = gameTime
    else
      if (gameTime.to_i < new_fastest_baseline.to_i)
        new_fastest_baseline = gameTime
      end
    end
    new_fastest_baseline_hit = current_user.fastest_baseline_hit
    if (new_fastest_baseline_hit == nil)
      new_fastest_baseline_hit = target_times.min
    else
      if (target_times.min < new_fastest_baseline_hit.to_i)
        new_fastest_baseline_hit = target_times.min
      end
    end
    current_user.update(
      baseline_hit_sum: new_baseline_hit_sum,
      baseline_total_clicks: new_baseline_total_clicks,
      baseline_total_hits: new_baseline_total_hits,
      fastest_baseline: new_fastest_baseline,
      fastest_baseline_hit: new_fastest_baseline_hit,
      average_baseline_hit: new_average_baseline_hit,
      baseline_accuracy: new_baseline_accuracy,
      baseline_games: new_baseline_games
    )
  end
  def update_challenge(total_hits, total_clicks, target_times)
    new_challenge_games = current_user.challenge_games.to_i + 1
    new_challenge_total_hits = current_user.challenge_total_hits.to_i + total_hits
    new_challenge_hit_sum = current_user.challenge_hit_sum.to_i + target_times.sum
    new_average_challenge_hit = (new_challenge_hit_sum.to_f/new_challenge_total_hits.to_f).round
    new_challenge_total_clicks = current_user.challenge_total_clicks.to_i + total_clicks
    new_challenge_accuracy = ((new_challenge_total_hits.to_f/new_challenge_total_clicks.to_f) * 100).round(1)
    new_challenge_average_hit_count = (new_challenge_total_hits.to_f/new_challenge_games.to_f).round
    new_most_challenge_hits = current_user.most_challenge_hits
    if new_most_challenge_hits ==  nil
      new_most_challenge_hits = total_hits
    else
      if (total_hits.to_i > new_most_challenge_hits.to_i)
        new_most_challenge_hits = total_hits
      end
    end
    current_user.update(
      challenge_hit_sum: new_challenge_hit_sum,
      challenge_total_clicks: new_challenge_total_clicks,
      challenge_total_hits: new_challenge_total_hits,
      most_challenge_hits: new_most_challenge_hits,
      average_challenge_hit: new_average_challenge_hit,
      challenge_accuracy: new_challenge_accuracy,
      challenge_average_hit_count: new_challenge_average_hit_count,
      challenge_games: new_challenge_games
    )
  end
  def update_totals(total_hits, total_clicks, target_times)
    new_total_games = current_user.games.count
    new_total_hits = current_user.total_hits.to_i + total_hits
    new_hit_sum = current_user.hit_sum.to_i + target_times.sum
    new_average_hit = (new_hit_sum.to_f/new_total_hits.to_f).round
    new_total_clicks = current_user.total_clicks.to_i + total_clicks
    new_total_accuracy = ((new_total_hits.to_f/new_total_clicks.to_f) * 100).round(1)
    current_user.update(
      total_games: new_total_games,
      total_hits: new_total_hits,
      hit_sum: new_hit_sum,
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