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
 (3206789, 'Bart', 'Simpson', 'Springfield', '5551234', '01/04/1990'),
  (1175490, 'Homer', 'Simpson', 'Springfield', '5555678', '12/05/1956'),
  (2315480, 'Lisa', 'Simpson', 'Springfield', '5554321', '09/05/1981');
