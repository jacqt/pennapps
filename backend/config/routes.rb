Rails.application.routes.draw do
  scope 'v1' do
    get 'society' => 'societies#show'
    post 'society' => 'societies#update'
    scope 'auth' do
      scope 'societies' do
        post 'sign_up' => 'societies#create'
      end
    end
  end
end
