Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get '/', to: 'static_page#index'
  get '/play', to: 'static_page#index'
  get '/stats', to: 'static_page#index'
  devise_scope :user do
    get 'users/sign_out' => 'devise/sessions#destroy'
  end

  namespace :api do
    namespace :v1 do
      resource :games, only: [:index, :create]
      resource :users, only: [:show]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
