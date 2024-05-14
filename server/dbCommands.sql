create database zeroCarbon;

\C zeroCarbon;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE contact(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT
);

CREATE TABLE household_common (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    electricity_usage DECIMAL,
    water_usage DECIMAL,
    waste_generation DECIMAL,
    gas_cylinder DECIMAL
);

CREATE TABLE business_common (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    electricity_usage DECIMAL,
    water_usage DECIMAL,
    paper_consumption DECIMAL,
    waste_generation DECIMAL,
    fuel_consumption DECIMAL,
    business_travel DECIMAL
);


CREATE TABLE family_members (
    id SERIAL PRIMARY KEY,
    household_common_id INT REFERENCES household_common(id),
    name VARCHAR(255),
    private_vehicle DECIMAL,
    public_vehicle DECIMAL,
    air_travel DECIMAL,
    veg_meals DECIMAL,
    non_veg_meals DECIMAL
);


