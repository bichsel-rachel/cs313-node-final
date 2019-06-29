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

SELECT * FROM category c INNER JOIN tip t ON c.id = t.category_id INNER JOIN users u ON t.users_id = u.id WHERE c.id = 1;

INSERT INTO tip (users_id, category_id, tip_title, tip_description) VALUES ('1', '2', 'Show by Example', 'My son has always refused to eat veggies. One day as I was trying to give him a vegetable, he said, "No, you eat it." It was at that moment I realized I didnt want to eat it as well. I started eating veggies around him and just the other day he asked if he could eat one. Lead by example!');

INSERT INTO tip (users_id, category_id, tip_title, tip_description) VALUES ('1', '3', 'Nap Where they Sleep', 'I made the mistake of letting me son nap on the couch. He then started to not want to sleep in his crib at night.');

INSERT INTO tip (users_id, category_id, tip_title, tip_description) VALUES ('1', '4', 'Time Out', 'The only way I can get time out to work is have a designated spot in the room.');