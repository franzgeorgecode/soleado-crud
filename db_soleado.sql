-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS db_soleado;

-- Selecciona la base de datos
USE db_soleado;

-- Crea la tabla clientes
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT(11) NOT NULL AUTO_INCREMENT,
  identificacion INT(11) NULL,
  nombres VARCHAR(45) NULL,
  apellidos VARCHAR(45) NULL,
  direccion VARCHAR(90) NULL,
  telefono VARCHAR(15) NULL,
  fecha_nacimiento DATE NULL,
  PRIMARY KEY (id_cliente)
);

-- Inserta ejemplos cómicos de registros de usuarios
INSERT INTO clientes (identificacion, nombres, apellidos, direccion, telefono, fecha_nacimiento)
VALUES
  (3206789, 'Bart', 'Simpson', 'Calle de los Travesuras, Springfield', '555-1234', '1990-04-01'),
  (1175490, 'Homer', 'Simpson', '742 Evergreen Terrace, Springfield', '555-5678', '1956-05-12'),
  (2315480, 'Lisa', 'Simpson', 'Avenida de la Sabiduría, Springfield', '555-4321', '1981-05-09');
