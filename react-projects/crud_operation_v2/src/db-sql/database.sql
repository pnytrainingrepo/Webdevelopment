CREATE DATABASE mydatabase;
\c mydatabase;

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);