CREATE DATABASE IF NOT EXISTS pos_system;
USE pos_system;

-- Product Categories
CREATE TABLE ProductCategory (
    category_id CHAR(255) NOT NULL PRIMARY KEY,
    category_classification VARCHAR(255) NOT NULL
);

-- Products
CREATE TABLE Products (
    product_id CHAR(255) NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_buying_price DECIMAL(8, 2) NOT NULL,
    product_selling_price DECIMAL(8, 2) NOT NULL,
    product_stock INT NOT NULL DEFAULT 0,
    category_id CHAR(255) NOT NULL,
    total_bought INT NOT NULL,
    
    FOREIGN KEY (category_id) REFERENCES ProductCategory(category_id)
);

-- Product History
CREATE TABLE ProductHistory (
    product_id CHAR(255) NOT NULL PRIMARY KEY,
    change_datetime DATE NOT NULL,
    old_bought_price DECIMAL(8, 2) NOT NULL,
    new_bought_price DECIMAL(8, 2) NOT NULL,
    old_selling_price DECIMAL(8, 2) NOT NULL,
    new_selling_price DECIMAL(8, 2) NOT NULL
);

-- Cashiers
CREATE TABLE Cashiers (
    cashier_id CHAR(255) NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    rate_per_hour DECIMAL(8, 2) NOT NULL,
    username VARCHAR(255) NOT NULL,
    hashed_password CHAR(255) NOT NULL,
    password_salt CHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

-- Cashier Transactions
CREATE TABLE CashierTransaction (
    transaction_id CHAR(255) NOT NULL PRIMARY KEY,
    product_id CHAR(255) NOT NULL,
    cashier_id CHAR(255) NOT NULL,
    quantity INT NOT NULL,
    transaction_datetime DATETIME NOT NULL,
    
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (cashier_id) REFERENCES Cashiers(cashier_id)
);

-- Inventory History
CREATE TABLE InventoryHistory (
    inventory_id CHAR(255) NOT NULL PRIMARY KEY,
    product_id CHAR(255) NOT NULL,
    restock_datetime DATETIME NOT NULL,
    current_stock INT NOT NULL,
    added_stock INT NOT NULL,
    total_sold INT NOT NULL DEFAULT 0,
    
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);









