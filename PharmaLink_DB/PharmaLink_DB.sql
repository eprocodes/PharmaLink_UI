
CREATE TABLE admin_account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pharmacy_account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    pharmacy_id INT REFERENCES pharmacy(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicine (
    id SERIAL PRIMARY KEY,
    pharmacy_id INT REFERENCES pharmacy(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    category VARCHAR(100),
    manufacturer VARCHAR(100),
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicine_order (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES client(id) ON DELETE CASCADE,
    medication_id INT REFERENCES medication(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,
    reminder TEXT,
    duration_days INT,
    order_date DATE DEFAULT CURRENT_DATE
);

