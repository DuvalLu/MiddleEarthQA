CREATE DATABASE forum_app;
USE forum_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category_id INT,
  title VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT,
  user_id INT,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- LOTR Categories
INSERT INTO categories (name) VALUES
  ('The Fellowship'),
  ('Races of Middle-Earth'),
  ('Locations & Places'),
  ('Weapons & Artifacts'),
  ('The War of the Ring');

-- Example users (passwords are hashed in real use)
INSERT INTO users (username, email, password) VALUES
  ('Gandalf', 'gandalf@middleearth.com', 'hashed_pw_1'),
  ('Aragorn', 'aragorn@middleearth.com', 'hashed_pw_2'),
  ('Frodo', 'frodo@middleearth.com', 'hashed_pw_3');

-- Example questions
INSERT INTO questions (user_id, category_id, title, question) VALUES
  (1, 1, 'Why did Gandalf choose the hobbits?', 'What was Gandalfs reasoning for involving the hobbits in the quest?'),
  (2, 5, 'Battle of Helms Deep tactics', 'How did Theoden decide to make his stand at Helms Deep?'),
  (3, 3, 'How far is Mordor really?', 'Has anyone mapped out the actual distance Frodo traveled?');

-- Example answers
INSERT INTO answers (question_id, user_id, answer) VALUES
  (1, 2, 'Hobbits are overlooked by Sauron, making them perfect ring-bearers.'),
  (2, 1, 'The walls of Helms Deep had never been breached before — it was the safest option.');