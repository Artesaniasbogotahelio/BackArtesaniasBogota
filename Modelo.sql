-- Creación de la tabla Categorias
CREATE TABLE Categorias (
    idCategoria SERIAL PRIMARY KEY,
    Categoria VARCHAR(10)
);

-- Creación de la tabla Producto
CREATE TABLE Producto (
    idProducto SERIAL PRIMARY KEY,
    idCategoria INT NOT NULL,
    Hist_idProducto INT,
    NombreProducto VARCHAR(20),
    FOREIGN KEY (idCategoria) REFERENCES Categorias(idCategoria)
);

-- Creación de la tabla HistoricoPrecio
CREATE TABLE HistoricoPrecio (
    idHistorico SERIAL PRIMARY KEY,
    idProducto INT NOT NULL,
    Precio MONEY,
    Fecha TIMESTAMP,
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

-- Creación de la tabla Factura
CREATE TABLE Factura (
    idFactura SERIAL PRIMARY KEY,
    Total MONEY,
    idUsuario INT
);

-- Creación de la tabla Compra
CREATE TABLE Compra (
    idProducto INT NOT NULL,
    idFactura INT NOT NULL,
    PRIMARY KEY (idProducto, idFactura),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idFactura) REFERENCES Factura(idFactura)
);

-- Creación de la tabla Direccion
CREATE TABLE Direccion (
    idLugar SERIAL PRIMARY KEY,
    idPuntoFisico INT NOT NULL,
    Dir_idLugar INT,
    Tipo TEXT,
    NombreLugar TEXT,
    FOREIGN KEY (idPuntoFisico) REFERENCES PuntoFisico(idPuntoFisico)
);

-- Creación de la tabla PuntoFisico
CREATE TABLE PuntoFisico (
    idPuntoFisico SERIAL PRIMARY KEY,
    NombrePunto TEXT,
    idLugar INT
);

-- Creación de la tabla Inventario
CREATE TABLE Inventario (
    idProducto INT NOT NULL,
    idPuntoFisico INT NOT NULL,
    PRIMARY KEY (idProducto, idPuntoFisico),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    FOREIGN KEY (idPuntoFisico) REFERENCES PuntoFisico(idPuntoFisico)
);
