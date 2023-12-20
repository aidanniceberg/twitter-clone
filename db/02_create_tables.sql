USE twitter;

CREATE TABLE IF NOT EXISTS user
(
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    bio VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS followings
(
    follower VARCHAR(255) NOT NULL,
    followee VARCHAR(255) NOT NULL,
    followed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower, followee),
    FOREIGN KEY (follower) REFERENCES user(username),
    FOREIGN KEY (followee) REFERENCES user(username)
);

CREATE TABLE IF NOT EXISTS post
(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    author VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    response_to INTEGER NULL,
    FOREIGN KEY (author) REFERENCES user(username),
    FOREIGN KEY (response_to) REFERENCES post(id)
);
