USE twitter;

INSERT INTO user
(username, email, birthday, bio, first_name, last_name, created_at, public)
VALUES
('aidan', 'aidan@gmail.com', '2002-07-28', 'aidans bio', 'Aidan', 'Niceberg', '2023-12-24 00:00:00', 1),
('chloe', 'chloe@gmail.com', '2004-11-02', 'chloes bio', 'Chloe', 'Niceberg', '2023-12-25 00:00:00', 0),
('peter', 'peter@gmail.com', '1959-02-16', 'dads bio', 'Peter', 'Niceberg', '2023-12-26 00:00:00', 0),
('sharon', 'sharon@gmail.com', '1969-05-23', 'moms bio', 'Sharon', 'Okamoto', '2023-12-27 00:00:00', 0);

INSERT INTO followings
(follower, followee, followed_at)
VALUES
('chloe', 'aidan', '2023-12-28 00:00:00'),
('peter', 'aidan', '2023-12-29 00:00:00'),
('sharon', 'aidan', '2023-12-30 00:00:00');

-- posts
INSERT INTO post
(id, author, content)
VALUES
(1, 'aidan', 'aidans first post'),
(2, 'chloe', 'chloes first post'),
(3, 'peter', 'dads first post'),
(4, 'sharon', 'moms first post');

-- comments
INSERT INTO post
(id, author, content, response_to)
VALUES
(5, 'chloe', 'comment on aidans post', 1),
(6, 'peter', 'comment on chloes post', 2),
(7, 'sharon', 'comment on dads post', 3),
(8, 'aidan', 'comment on moms post', 4);
