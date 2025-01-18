-- Insertar datos en la tabla DIRECCION
INSERT INTO DIRECCION (TIPO, NOMBRELUGAR, PADRE_LUGAR) VALUES 
('País', 'Colombia', NULL),
('Ciudad', 'Bogotá', 1),
('Dirección', 'Calle 21 #88a-49', 2),
('Ciudad', 'Medellín', 1),
('Dirección', 'Carrera 45 #67-12', 4);

-- Insertar datos en la tabla ROL
INSERT INTO ROL (ROL, DESCRIPCION) VALUES
('Cliente', 'Usuario que realiza compras o utiliza servicios'),
('Administrador', 'Usuario con acceso a gestionar el sistema'),
('Gerente', 'Usuario responsable de la supervisión');

-- Insertar datos en la tabla USUARIO
INSERT INTO USUARIO (IDROL, IDLUGAR, USUARIO, CONTRASENA, ESTILO, CORREO, ESTADO, CODIGO_ACTIVACION) VALUES
(1, 3, 'cliente01', 'pass123', 'moderno', 'cliente01@example.com', TRUE, 'abc123'),
(2, 5, 'admin01', 'admin123', 'clásico', 'admin01@example.com', TRUE, 'def456'),
(3, NULL, 'gerente01', 'manager123', 'minimalista', 'gerente01@example.com', FALSE, 'ghi789');
