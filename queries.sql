/*Crear tabla de roles*/
CREATE TABLE roles (
	role_id SERIAL NOT NULL PRIMARY KEY,
	role_name VARCHAR (50) NOT NULL UNIQUE
);

/*Crear tabla para los datos de los usuarios*/
CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
   	role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
	FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

/*Crear tabla para los eventos favoritos*/
CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    favorite_name VARCHAR (100) NOT NULL UNIQUE,
    favorite_image VARCHAR (255),
    date_start date NOT NULL,
    date_end date NOT NULL,
    favorite_url VARCHAR(255),
    favorite_type VARCHAR (100)
);

/*Crear tabla user-favorites*/
CREATE TABLE userFavorite (
    favorite_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (favorite_id) REFERENCES favorites(favorite_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/*Poblar tabla Roles*/
INSERT INTO roles (role_name)
VALUES 
	('admin'),
	('user');

/*Poblar tabla Users*/
INSERT INTO users (email, password_hash, first_name, last_name, role_id, is_active)
VALUES 
	('admin@admin.com', 'aasfsakfhashfkafhashfas', 'Luis', 'Acosta', 1, true);

/*Poblar tabla Favoritos*/
INSERT INTO favorites (favorite_name, favorite_image, date_start, date_end, favorite_url, favorite_type)
VALUES 
	('World Mobile Congress', 'https://www.lifecycle-software.com/hs-fs/hubfs/social%20backgrounds%20on%20launch-01.png?width=2385&height=1341&name=social%20backgrounds%20on%20launch-01.png', '1994-10-27', '1994-10-30', 'https://www.mwcbarcelona.com', 'Congreso');

/*Poblar tabla userFavorites*/
INSERT INTO userFavorites (user_id, favorite_id)
VALUES 
	(2, 4);

/*Traer todos los campos de favoritos en base al usuario, menos el favorite_id*/
SELECT
        f.favorite_name,
		f.favorite_image,
		f.date_start,
		f.date_end,
		f.favorite_url,
		f.favorite_type
    FROM 
        favorites as f
    INNER JOIN 
        userfavorite as uf ON uf.favorite_id = f.favorite_id
    WHERE 
        uf.user_id=6