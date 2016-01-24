Rails.application.routes.draw do
  get 'client_token' => 'payments#client_token'
  scope 'v1' do
    get 'society' => 'societies#show'
    post 'society' => 'societies#update'
    post 'items' => 'items#create'
    post 'items/:id' => 'items#update'
    delete 'items/:id' => 'items#destroy'
    scope 'auth' do
      post 'sign_up' => 'societies#create'
      post 'login' => 'login#login'
      post 'login_with_token' => 'login#login_with_token'
    end
  end
end
