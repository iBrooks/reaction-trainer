Rails.application.routes.draw do
  get '/', to: 'static_page#index'
  get '/play', to: 'static_page#index'
  get '/stats', to: 'static_page#index'

  devise_for :users
  namespace :api do
    namespace :v1 do
      resource :games, only: [:index, :create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
