Rails.application.routes.draw do

  devise_for :users
  
  resources :users do 
    member do 
      post :login
      post :reset
      post :loginEmail
    end
  end

  resources :categories do 
    resources :products
  end

  resources :addresses do 
    collection do 
      get :suggestion
    end
  end

  resources :orders
  resources :products

  get '/home/user', to: 'home#user', as: 'user_home'

  root to: 'categories#index'
end
