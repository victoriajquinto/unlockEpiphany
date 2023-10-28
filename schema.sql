CREATE DATABASE unlock_epiphany;
\c unlock_epiphany;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  mbti VARCHAR(4),
  interests TEXT[],
  frequency int,
  emails_sent_count INT DEFAULT 0
);

CREATE TABLE content (
  content_id SERIAL PRIMARY KEY,
  topic TEXT,
  advice TEXT,
  date_sent DATE,
  user_id INT REFERENCES users(user_id)
);