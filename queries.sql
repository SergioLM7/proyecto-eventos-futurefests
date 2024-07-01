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
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_logged BOOLEAN NOT NULL,
    last_time_logged TIMESTAMP WITH TIME ZONE NOT NULL,
	FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

/*Crear tabla user-favorites*/
CREATE TABLE userfavorite (
    userfavorite_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    favorite_id VARCHAR(300) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT unique_favorite_user UNIQUE (favorite_id, user_id)
);

/*Poblar tabla Roles*/
INSERT INTO roles (role_name)
VALUES 
	('admin'),
	('user');

/*Poblar tabla Users*/
INSERT INTO users (email, password_hash, first_name, last_name, role_id, is_active, is_logged, last_time_logged)
VALUES 
	('admin@admin.com', 'aasfsakfhashfkafhashfas', 'Luis', 'Acosta');

/*Poblar tabla userFavorites*/
INSERT INTO userfavorite (user_id, favorite_id)
VALUES
	(2, 4);