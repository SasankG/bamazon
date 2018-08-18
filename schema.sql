DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
    itemID  INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    prices DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(itemID)
);

select * from Products;

INSERT INTO Products(product_name,department_name,prices,stock_quantity)
VALUES ("pokemon","games",45.50,100),
    ("kirby","games",45.50,200),
    ("starfox","games",24.50,50),
    ("jacket","clothing",75.00,50),
    ("jeans","clothing",100.00,100),
    ("sandwhich","foods",4.50,80),
    ("deadpool","movies",15.00,25),
    ("familyguy","movies",25.50,57),
    ("digimon","movies",30.50,35),
    ("glasses","clothing",19.95,23);