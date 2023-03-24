/* Replace with your SQL commands */

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_activity_logs CASCADE;
DROP TABLE IF EXISTS activity_types CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS deliveries CASCADE;
DROP TYPE IF EXISTS user_status;
DROP TYPE IF EXISTS activity_status;
DROP TYPE IF EXISTS product_status;
DROP TYPE IF EXISTS product_type; 
DROP TYPE IF EXISTS order_status;
DROP TYPE IF EXISTS delivery_status;

DROP INDEX IF EXISTS orders_order_id_index;
DROP INDEX IF EXISTS orders_product_id_index;
DROP INDEX IF EXISTS products_product_id_index;
DROP INDEX IF EXISTS reviews_product_id_index;
DROP INDEX IF EXISTS reviews_review_id_index;
DROP INDEX IF EXISTS reviews_user_id_index;
DROP INDEX IF EXISTS deliveries_delivery_id_index;
DROP INDEX IF EXISTS user_activity_logs_user_id_index;
DROP INDEX IF EXISTS user_activity_logs_activity_type_index;
DROP INDEX IF EXISTS users_user_id_index;
