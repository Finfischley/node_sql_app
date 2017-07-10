DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(30)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 27.00, 63);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 10.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cd", "music", 12.00, 1100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("walkman", "music", 8.00, 170);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hi-fi", "music", 159.00, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("asparagus", "food", 2.00, 325);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("broccoli", "food", 1.15, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("avacado", "food", 1.15, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("binoculars", "outdoor", 36.00, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tent", "outdoor", 125.00, 90);


