DROP DATABASE IF EXISTS twitter;
CREATE DATABASE IF NOT EXISTS twitter;

-- Via the Docker Compose file, a special user called webapp will
-- be created in MySQL. We are going to grant that user
-- all privilages to the new database we just created.
grant all privileges on twitter.* to 'webapp'@'%';
flush privileges;
