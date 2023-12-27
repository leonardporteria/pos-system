import { pool } from '../config/database.js';

// create database and tables
export const createSchema = async () => {
  const createQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`;
  await pool.query(createQuery);

  const useQuery = `USE ${process.env.MYSQL_DATABASE};`;
  await pool.query(useQuery);

  // * TABLES
  const createProductCategoryTable = `
    CREATE TABLE IF NOT EXISTS ProductCategory (
        category_id CHAR(255) PRIMARY KEY,
        category_classification VARCHAR(255) NOT NULL
    );
`;

  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS Products (
        product_id CHAR(255) PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        product_buying_price DECIMAL(10, 2) NOT NULL,
        product_selling_price DECIMAL(10, 2) NOT NULL,
        product_stock INT NOT NULL DEFAULT 0,
        category_id CHAR(255) NOT NULL,
        total_bought INT NOT NULL,
        
        FOREIGN KEY (category_id) REFERENCES ProductCategory(category_id)
    );
`;

  const createProductHistoryTable = `
    CREATE TABLE IF NOT EXISTS ProductHistory (
        product_id CHAR(255) PRIMARY KEY,
        change_datetime DATE NOT NULL,
        old_bought_price DECIMAL(10, 2) NOT NULL,
        new_bought_price DECIMAL(10, 2) NOT NULL,
        old_selling_price DECIMAL(10, 2) NOT NULL,
        new_selling_price DECIMAL(10, 2) NOT NULL
    );
`;

  const createCashiersTable = `
    CREATE TABLE IF NOT EXISTS Cashiers (
        cashier_id CHAR(255) PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        middle_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        rate_per_hour DECIMAL(10, 2) NOT NULL,
        username VARCHAR(255) NOT NULL,
        hashed_password CHAR(255) NOT NULL,
        password_salt CHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    );
`;

  const createCashierTransactionTable = `
    CREATE TABLE IF NOT EXISTS CashierTransaction (
        transaction_id CHAR(255) PRIMARY KEY,
        product_id CHAR(255) NOT NULL,
        cashier_id CHAR(255) NOT NULL,
        quantity INT NOT NULL,
        transaction_datetime DATETIME NOT NULL,
        
        FOREIGN KEY (product_id) REFERENCES Products(product_id),
        FOREIGN KEY (cashier_id) REFERENCES Cashiers(cashier_id)
    );
`;

  const createInventoryHistoryTable = `
    CREATE TABLE IF NOT EXISTS InventoryHistory (
        inventory_id CHAR(255) PRIMARY KEY,
        product_id CHAR(255) NOT NULL,
        restock_datetime DATETIME NOT NULL,
        current_stock INT NOT NULL,
        added_stock INT NOT NULL,
        total_sold INT NOT NULL DEFAULT 0,
        
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    );
`;

  // Execute each query individually
  await pool.query(createProductCategoryTable);
  await pool.query(createProductsTable);
  await pool.query(createProductHistoryTable);
  await pool.query(createCashiersTable);
  await pool.query(createCashierTransactionTable);
  await pool.query(createInventoryHistoryTable);

  return 'DATABASE SCHEMA CREATED';
};
