CREATE TABLE users (
id SERIAL PRIMARY KEY,
username text NOT NULL,
first_name text,
last_name text,
email text NOT NULL,
password text NOT NULL
);

CREATE TABLE category (
id SERIAL PRIMARY KEY,
category_name text
);

CREATE TABLE tip (
id SERIAL PRIMARY KEY,
users_id INT REFERENCES users(id),
category_id INT REFERENCES category(id),
tip_title text,
tip_description text,
thumbs_up int,
thumbs_down int
);


INSERT INTO users (username, first_name, last_name, email, password) VALUES ('testuser', 'Test', 'One', 'test@gmail.com', 'test123');

INSERT INTO category (category_name) VALUES ('Sleeping');

INSERT INTO category (category_name) VALUES ('Eating');

INSERT INTO category (category_name) VALUES ('Napping');

INSERT INTO category (category_name) VALUES ('Discipline');

INSERT INTO category (category_name) VALUES ('Media');

INSERT INTO tip (users_id, category_id, tip_title, tip_description) VALUES ('1', '1', 'Crying it Out', 'The camping out method doesnt work on my child. The only thing that worked was having her cry it out. It is hard the first week, but eventaully she gets it down.');



