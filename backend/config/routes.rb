Rails.application.routes.draw do
  scope 'v1' do
    get 'society' => 'societies#show'
    post 'society' => 'societies#update'
    post 'items' => 'items#create'
    post 'items/:id' => 'items#update'
    scope 'auth' do
      post 'sign_up' => 'societies#create'
    end
  end
end
