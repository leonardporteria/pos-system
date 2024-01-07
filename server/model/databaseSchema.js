import { pool } from '../config/database.js';

const createQueries = [
  `CREATE TABLE IF NOT EXISTS employees (
      employee_id CHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      password CHAR(255) NOT NULL,
      hourly_wage DECIMAL(8, 2) NOT NULL,
      work_schedule DATETIME NOT NULL,
      role_id CHAR(255) NOT NULL DEFAULT 'FK'
  );`,

  `CREATE TABLE IF NOT EXISTS suppliers (
      supplier_id CHAR(255) PRIMARY KEY,
      supplier_name VARCHAR(255) NOT NULL,
      supplier_contact VARCHAR(255) NOT NULL,
      supplier_telephone VARCHAR(255) NOT NULL,
      supplier_address VARCHAR(255) NOT NULL,
      supplier_email VARCHAR(255) NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS transactions (
      transaction_id CHAR(255) PRIMARY KEY,
      transaction_datetime DATETIME NOT NULL,
      payment_method VARCHAR(255) NOT NULL,
      total_amount INT NOT NULL,
      employee_id CHAR(255) NOT NULL DEFAULT 'FK'
  );`,

  `CREATE TABLE IF NOT EXISTS product_history (
      product_history_id CHAR(255) PRIMARY KEY,
      product_id CHAR(255) NOT NULL DEFAULT 'FK',
      old_bought_price DECIMAL(8, 2) NOT NULL,
      new_bought_price DECIMAL(8, 2) NOT NULL,
      old_selling_price DECIMAL(8, 2) NOT NULL,
      new_selling_price DECIMAL(8, 2) NOT NULL,
      change_datetime DATETIME NOT NULL,
      employee_id CHAR(255) NOT NULL DEFAULT 'FK'
  );`,

  `CREATE TABLE IF NOT EXISTS products (
      product_id CHAR(255) PRIMARY KEY,
      barcode_id BIGINT NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      unit_price DECIMAL(8, 2) NULL,
      brand VARCHAR(255) NOT NULL,
      classification VARCHAR(255) NOT NULL,
      product_category_id CHAR(255) NOT NULL DEFAULT 'FK'
  );`,

  `CREATE TABLE IF NOT EXISTS product_inventory (
      inventory_id CHAR(255) PRIMARY KEY,
      product_id CHAR(255) NOT NULL DEFAULT 'FK',
      current_stock INT NOT NULL,
      minimum_stock_level INT NOT NULL,
      maximum_stock_level INT NOT NULL,
      last_stock_update DATETIME NOT NULL,
      reorder_level INT NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS transaction_details (
      transaction_id CHAR(255),
      product_id CHAR(255),
      quantity INT NOT NULL,
      subtotal DECIMAL(8, 2) NOT NULL,
      PRIMARY KEY (transaction_id, product_id)
  );`,

  `CREATE TABLE IF NOT EXISTS orders (
      order_id CHAR(255) PRIMARY KEY,
      order_date DATE NOT NULL,
      employee_id CHAR(255) NOT NULL DEFAULT 'FK'
  );`,

  `CREATE TABLE IF NOT EXISTS product_category (
      product_category_id CHAR(255) PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS order_details (
      order_id CHAR(255) NOT NULL,
      inventory_id CHAR(255) NOT NULL,
      expected_date DATE NOT NULL,
      actual_date DATE NOT NULL,
      order_quantity CHAR(255) NOT NULL,
      supplier_id CHAR(255) NOT NULL DEFAULT 'FK',
      PRIMARY KEY (order_id, inventory_id)
  );`,

  `CREATE TABLE IF NOT EXISTS roles (
      role_id CHAR(255) PRIMARY KEY,
      role_name BIGINT NOT NULL,
      description VARCHAR(255) NOT NULL,
      permission VARCHAR(255) NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS attendance (
      attendance_id CHAR(255) PRIMARY KEY,
      employee_id CHAR(255) NOT NULL DEFAULT 'FK',
      attendance_datetime DATETIME NOT NULL,
      time_in DATETIME NOT NULL,
      time_out DATETIME NOT NULL,
      total_hours_worked INT NOT NULL,
      status VARCHAR(255) NOT NULL
  );`,

  `CREATE PROCEDURE IF NOT EXISTS AddForeignKeyIfNotExists(IN constraintName VARCHAR(255), IN tableName VARCHAR(255), IN columnName VARCHAR(255), IN referenceTable VARCHAR(255), IN referenceColumn VARCHAR(255))
  BEGIN
      DECLARE constraintCount INT;
  
      SELECT COUNT(*)
      INTO constraintCount
      FROM information_schema.table_constraints
      WHERE constraint_name = constraintName
      AND table_name = tableName;
  
      IF constraintCount = 0 THEN
          SET @query = CONCAT('ALTER TABLE ', tableName, ' ADD CONSTRAINT ', constraintName, ' FOREIGN KEY (', columnName, ') REFERENCES ', referenceTable, '(', referenceColumn, ');');
          PREPARE stmt FROM @query;
          EXECUTE stmt;
          DEALLOCATE PREPARE stmt;
      END IF;
  END;`,
];

const alterQueries = [
  `CALL AddForeignKeyIfNotExists('attendance_employee_id_foreign', 'attendance', 'employee_id', 'employees', 'employee_id');`,
  `CALL AddForeignKeyIfNotExists('orderdetails_inventory_id_foreign', 'order_details', 'inventory_id', 'product_inventory', 'inventory_id');`,
  `CALL AddForeignKeyIfNotExists('transactiondetails_product_id_foreign', 'transaction_details', 'product_id', 'products', 'product_id');`,
  `CALL AddForeignKeyIfNotExists('producthistory_product_id_foreign', 'product_history', 'product_id', 'products', 'product_id');`,
  `CALL AddForeignKeyIfNotExists('productinventory_product_id_foreign', 'product_inventory', 'product_id', 'products', 'product_id');`,
  `CALL AddForeignKeyIfNotExists('transaction_total_amount_foreign', 'transactions', 'transaction_id', 'employees', 'employee_id');`,
  `CALL AddForeignKeyIfNotExists('employee_role_id_foreign', 'employees', 'role_id', 'roles', 'role_id');`,
  `CALL AddForeignKeyIfNotExists('producthistory_employee_id_foreign', 'product_history', 'employee_id', 'employees', 'employee_id');`,
  `CALL AddForeignKeyIfNotExists('order_employee_id_foreign', 'orders', 'employee_id', 'employees', 'employee_id');`,
  `CALL AddForeignKeyIfNotExists('transaction_transaction_id_foreign', 'transactions', 'transaction_id', 'transaction_details', 'transaction_id');`,
  `CALL AddForeignKeyIfNotExists('orderdetails_supplier_id_foreign', 'order_details', 'supplier_id', 'suppliers', 'supplier_id');`,
  `CALL AddForeignKeyIfNotExists('orderdetails_order_id_foreign', 'order_details', 'order_id', 'orders', 'order_id');`,
  `CALL AddForeignKeyIfNotExists('product_product_category_id_foreign', 'products', 'product_category_id', 'product_category', 'product_category_id');`,
];

const createTables = async () => {
  const useQuery = `USE ${process.env.MYSQL_DATABASE};`;
  await Promise.all(
    createQueries.map(async (query) => {
      await pool.query(useQuery);
      await pool.query(query);
    })
  );
  return 'TABLES CREATED';
};

const alterTables = async () => {
  const useQuery = `USE ${process.env.MYSQL_DATABASE};`;
  await Promise.all(
    alterQueries.map(async (query) => {
      await pool.query(useQuery);
      await pool.query(query);
    })
  );
  return 'CONSTRATINS ADDED';
};

// create database and tables
export const createSchema = async () => {
  const createQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`;
  const useQuery = `USE ${process.env.MYSQL_DATABASE};`;

  await pool.query(createQuery);
  await pool.query(useQuery);

  await createTables();

  await alterTables();

  return 'DATABASE CREATED';
};
