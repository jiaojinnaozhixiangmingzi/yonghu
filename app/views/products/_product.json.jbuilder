json.extract! product, :id, :username, :password, :created_at, :updated_at
json.url product_url(product, format: :json)
