json.extract! product, :id, :name, :logo, :is_del, :category_id, :created_at, :updated_at
json.url product_url(product, format: :json)
