DROP TABLE IF EXISTS properties CASCADE;

CREATE TABLE IF NOT EXISTS properties (
    users_id SERIAL PRIMARY KEY,
    unit_number VARCHAR(255) NOT NULL, 
    building_number VARCHAR(255) NOT NULL, 
    street_name VARCHAR(255) NOT NULL, 
    key_number INT NOT NULL UNIQUE);