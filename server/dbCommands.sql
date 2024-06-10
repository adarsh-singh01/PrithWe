CREATE DATABASE zeroCarbon;

\c zeroCarbon;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    otp VARCHAR(20) DEFAULT '000000',

    otp_timestamp BIGINT,

    isVerified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE household_common (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    electricity_usage DECIMAL,
    water_usage DECIMAL,
    waste_generation DECIMAL,
    gas_cylinder DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE business_common (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    electricity_usage DECIMAL,
    water_usage DECIMAL,
    paper_consumption DECIMAL,
    waste_generation DECIMAL,
    fuel_consumption DECIMAL,
    business_travel DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    household_common_id INT REFERENCES household_common(id),
    name VARCHAR(255),
    private_vehicle DECIMAL,
    public_vehicle DECIMAL,
    air_travel DECIMAL,
    veg_meals DECIMAL,
    non_veg_meals DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    household_common_id INT,
    business_common_id INT,
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (household_common_id) REFERENCES household_common(id),
    FOREIGN KEY (business_common_id) REFERENCES business_common(id)
);
