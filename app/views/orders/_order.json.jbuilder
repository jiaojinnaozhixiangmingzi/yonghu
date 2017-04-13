json.extract! order, :id, :category, :user_id, :address_id, :total_price, :status, :courier_status, :voucher_status,
              :cleaning_status, :created_at, :updated_at, :waybill_id, :factory_id
json.url order_url(order, format: :json)