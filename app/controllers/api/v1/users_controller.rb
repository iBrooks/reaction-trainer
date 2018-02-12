class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def show
    if current_user
      render json: { userName: current_user.user_name }, status: :ok
    else
      render json: { userName: 'guest' }, status: :no_content
    end
  end
end