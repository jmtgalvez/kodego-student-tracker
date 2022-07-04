DROP DATABASE enrolkodego;
CREATE DATABASE IF NOT EXISTS enrolkodego;

USE enrolkodego;

CREATE TABLE user(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username varchar(25) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  datecreated DATETIME
    DEFAULT CURRENT_TIMESTAMP,
  dateupdated TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE course(
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name varchar(50) NOT NULL,
  course_description varchar(50) NOT NULL,
  datecreated DATETIME
    DEFAULT CURRENT_TIMESTAMP,
  dateupdated TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE student(
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE,
  course_id INT NOT NULL,
  datecreated DATETIME
    DEFAULT CURRENT_TIMESTAMP,
  dateupdated TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY student(course_id)
	REFERENCES course(course_id)
    ON DELETE restrict
    ON UPDATE cascade
);

INSERT INTO user (username, password) VALUES ('sampol', 'asdfasdf');
INSERT INTO user (username, password) VALUES ('polsam', 'asdfqwer');