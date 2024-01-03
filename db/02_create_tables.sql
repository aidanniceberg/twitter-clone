USE twitter;

CREATE TABLE IF NOT EXISTS user
(
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    bio VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    public BOOLEAN NOT NULL DEFAULT 1
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

CREATE TABLE IF NOT EXISTS post_like
(
    post_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    liked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, username),
    FOREIGN KEY (post_id) REFERENCES post(id),
    FOREIGN KEY (username) REFERENCES user(username)
);
