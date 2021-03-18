-- borramos la base de datos
drop database if exists test1jmhe;

-- creamos la base de datos
create database if not exists test1jmhe;

-- seleccionamos la base de datos
use test1jmhe;

-- creamos la tabla productos
CREATE TABLE IF NOT EXISTS productos
(
  id int primary key  not null     unique       auto_increment     ,
  nombre varchar(45) not null,
  precio decimal(8,2) not null,
  fechacad datetime not null,
  createdAt timestamp,
  updatedAt timestamp
)ENGINE = InnoDB;

-- creamos la tabla ciudad
CREATE TABLE IF NOT EXISTS ciudad
(
  id int primary key  not null     unique       auto_increment     ,
  nombre varchar(45) not null,
  createdAt timestamp,
  updatedAt timestamp
)ENGINE = InnoDB;

-- creamos la tabla  tienda
CREATE TABLE IF NOT EXISTS tienda
(
  id int primary key  not null     unique       auto_increment     ,
  nombre varchar(45) not null,
  idCiudad int not null,
  createdAt timestamp,
  updatedAt timestamp,
  
  constraint fkCiudadTienda
  foreign key (idCiudad)
  references ciudad (id)
  on delete no action
)ENGINE = InnoDB;

-- creamos la tabla de union
CREATE TABLE IF NOT EXISTS tienda_producto
(
	id int primary key  not null     unique       auto_increment     ,
	idTienda int not null,
	idProducto int not null,
    
	constraint fkTiendaIdTienda
	foreign key (idTienda)
	references tienda (id)
	on delete no action,
	  
	constraint fkProductoIdProducto
	foreign key (idProducto)
	references productos (id)
	on delete no action
)ENGINE = InnoDB;

-- insertando 2 ciudades
insert into ciudad(id,nombre) values (0,'Ciudad 1');
insert into ciudad(id,nombre) values (0,'Ciudad 2');

-- insertando 3 tiendas
insert into tienda(id,nombre,idCiudad) values (0,'Tienda 1',1);
insert into tienda(id,nombre,idCiudad) values (0,'Tienda 2',2);
insert into tienda(id,nombre,idCiudad) values (0,'Tienda 3',2);


/*
select * from productos;
select * from tienda_producto;

truncate table productos;

select productos.nombre as producto,productos.precio,productos.fechacad,tienda.nombre as tienda,ciudad.nombre as ciudad from tienda_producto
inner join tienda on tienda_producto.idTienda = tienda.id
inner join productos on tienda_producto.idProducto = productos.id
inner join ciudad on tienda.idCiudad = ciudad.id
where productos.id = 1;
*/
