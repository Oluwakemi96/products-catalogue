/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE user_status AS ENUM('active', 'inactive', 'suspended', 'deactivated');
CREATE TYPE activity_status AS ENUM('success', 'fail');
CREATE TYPE product_status AS ENUM('available', 'sold out');
CREATE TYPE product_type AS ENUM('flat shoes', 'sneakers', 'boots', 'abaya', 'sandals', 'bags');
CREATE TYPE order_status AS ENUM('processing', 'shipped', 'delivered');
CREATE TYPE delivery_status AS ENUM('ongoing', 'delivered');


CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    user_id VARCHAR PRIMARY KEY DEFAULT 'user-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    is_email_verified BOOLEAN DEFAULT false,
    status user_status DEFAULT 'inactive',
    token TEXT,
    token_expiry TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION make_lower_trim() RETURNS TRIGGER AS '
    BEGIN
        new.first_name := LOWER(TRIM(new.first_name));
        new.last_name := LOWER(TRIM(new.last_name));
        new.email := LOWER(TRIM(new.email));
        RETURN NEW;
    END;
    ' LANGUAGE plpgsql;
CREATE TRIGGER make_lower_trim BEFORE INSERT OR UPDATE ON users FOR
EACH ROW EXECUTE PROCEDURE make_lower_trim();


INSERT INTO users(email, first_name, last_name, password, is_admin, is_email_verified, status)
VALUES ('rashidatoluwakemi96@gmail.com', 'rashidat', 'sikiru',' $2b$10$80AwTBRDGqQKE1smuqZjROYBY14dRhmuU1xidzzphdPkAF3smQttW',
 true, true, 'active')
ON CONFLICT (email)
DO
UPDATE
SET
email = EXCLUDED.email,
first_name = EXCLUDED.first_name,
last_name = EXCLUDED.last_name,
password = EXCLUDED.password,
is_admin = EXCLUDED.is_admin,
is_email_verified = EXCLUDED.is_email_verified,
status = EXCLUDED.status;

CREATE TABLE IF NOT EXISTS activity_type(
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO activity_type (code, name, description)
VALUES 
('SNUP', 'signup', 'user creates account'),
('VUEM', 'verify email', 'user creates account'),
('RESVEM', 'resend verify email', 'user regenerates verify email token'),
('FGPWD', 'forgot password', 'user forgets password'),
('REPWD', 'reset password', 'user resets password'),
('LGIN', 'login', 'user logs in'),
('ORPRD', 'order products', 'user places order for products'),
('CAORD', 'cancel order', 'user cancels order')
ON CONFLICT (code)
DO
UPDATE
SET
code = EXCLUDED.code,
name = EXCLUDED.name,
description = EXCLUDED.description;

CREATE TABLE user_activity_logs (
    id SERIAL,
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    activity_type VARCHAR REFERENCES activity_type(code) NOT NULL,
    activity_status activity_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL,
    product_id VARCHAR PRIMARY KEY DEFAULT 'product-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    category product_type NOT NULL, 
    sizes VARCHAR NOT NULL,
    product_image TEXT,
    status product_status DEFAULT 'available',
    quantity INT NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
    id SERIAL,
    order_id VARCHAR PRIMARY KEY DEFAULT 'order-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    product_id VARCHAR REFERENCES products(product_id) NOT NULL,
    size VARCHAR NOT NULL,
    quantity INT NOT NULL,
    status order_status DEFAULT 'processing',
    is_cancelled BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
    id SERIAL,
    review_id VARCHAR PRIMARY KEY DEFAULT 'review-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    product_id VARCHAR REFERENCES products(product_id) NOT NULL,
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    review TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deliveries (
    id SERIAL,
    delivery_id VARCHAR PRIMARY KEY DEFAULT 'delivery-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    order_id VARCHAR REFERENCES orders(order_id),
    product_id VARCHAR REFERENCES products(product_id),
    status delivery_status DEFAULT 'ongoing' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX orders_order_id_index ON orders(order_id);
CREATE INDEX orders_product_id_index ON orders(product_id);
CREATE INDEX products_product_id_index ON products(product_id);
CREATE INDEX reviews_product_id_index ON reviews(product_id);
CREATE INDEX reviews_review_id_index ON reviews(review_id);
CREATE INDEX reviews_user_id_index ON reviews(user_id);
CREATE INDEX deliveries_delivery_id_index ON deliveries(delivery_id);
CREATE INDEX user_activity_logs_user_id_index ON user_activity_logs(user_id);
CREATE INDEX user_activity_logs_activity_type_index ON user_activity_logs(activity_type);
CREATE INDEX users_user_id_index ON users(user_id);