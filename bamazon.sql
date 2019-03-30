DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10) NOT NULL,
  stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 20, 100);

INSERT INTO products (title, artist, genre)
VALUES ("shirts", "clothing", 15, 120);

INSERT INTO products (title, artist, genre)
VALUES ("civic", "vehicle", 50000, 10);
