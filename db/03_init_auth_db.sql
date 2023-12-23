DROP DATABASE IF EXISTS auth;
CREATE DATABASE IF NOT EXISTS auth;

grant all privileges on auth.* to 'webapp'@'%';
flush privileges;

USE auth;

CREATE TABLE IF NOT EXISTS user
(
    username VARCHAR(255) PRIMARY KEY,
    pw VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS revoked_token
(
    token TEXT NOT NULL,
    exp TIMESTAMP NOT NULL
);
