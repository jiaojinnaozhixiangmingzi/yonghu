Rails.application.routes.draw do

  devise_for :users
  
  resources :users do 
    member do 
      post :login
      post :reset
      post :registerEmail
      post :resetEmail
      post :setPassword
    end
  end

  resources :categories do 
    resources :products
    collection do
      get :getByCity
    end
  end

  resources :addresses do 
    collection do 
      get :suggestion
    end
  end

  resources :orders
  resources :products do
    member do
      post :getByCategory
    end
    collection do
      get :getByCityAndCategory
    end
  end

  get '/home/user', to: 'home#user', as: 'user_home'

  root to: 'categories#index'
end
