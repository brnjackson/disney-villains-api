CREATE DATABASE disney;

USE disney;

CREATE TABLE villains (
ID INT auto_increment,
Name varchar(255),
Movie varchar(255),
Slug varchar(255),
updatedAt DATETIME DEFAULT NOW(),
createdAt DATETIME DEFAULT NOW(),
PRIMARY KEY (ID)
);

INSERT INTO villains ( Name, Movie, Slug)
VALUES ('Captain Hook', 'Peter Pan', 'captain-hook'),
('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil'),
('Gaston', 'Beauty and the Beast', 'gaston'),
('Hades', 'Hercules', 'hades'),
('Horned King', 'The Black Cauldron', 'horned-king'),
('Jafar', 'Aladdin', 'jafar'),
('Lady Tremaine', 'Cinderella', 'lady-tremaine'),
('Madame Medusa', 'The Rescuers', 'madame-medusa'),
('Madam Mim', 'The Sword in the Stone', 'madam-mim'),
('Maleficent', 'Sleeping Beauty', 'maleficent'),
('Prince John', 'Robin Hood', 'prince-john'),
('Sir Hiss', 'Robin Hood', 'sir-hiss'),
('Queen Grimhilde', 'Snow White and the Seven Dwarfs', 'queen-grimhilde'),
('Queen of Hearts', 'Alice in Wonderland', 'queen-of-hearts'),
('Scar', 'The Lion King', 'scar'),
('Shan Yu', 'Mulan', 'shan-yu'),
('Shere Khan', 'The Jungle Book', 'shere-khan'),
('Ursula', 'The Little Mermaid', 'ursula');

SELECT * FROM villains;
