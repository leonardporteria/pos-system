CREATE DATABASE IF NOT EXISTS pos_system;
USE pos_system;

CREATE TABLE IF NOT EXISTS roles (
    role_id CHAR(255) PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    permission VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    employee_id CHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password CHAR(255) NOT NULL,
    hourly_wage DECIMAL(8, 2) NOT NULL,
    work_schedule DATETIME NOT NULL,
    role_id CHAR(255) NOT NULL DEFAULT 'FK',
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS attendance (
    attendance_id CHAR(255) PRIMARY KEY,
    employee_id CHAR(255) NOT NULL,
    attendance_datetime DATETIME NOT NULL,
    time_in DATETIME NOT NULL,
    time_out DATETIME NOT NULL,
    total_hours_worked INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id CHAR(255) PRIMARY KEY,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_contact VARCHAR(255) NOT NULL,
    supplier_telephone VARCHAR(255) NOT NULL,
    supplier_address VARCHAR(255) NOT NULL,
    supplier_email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    order_id CHAR(255) PRIMARY KEY,
    order_date DATE NOT NULL,
    employee_id CHAR(255) NOT NULL DEFAULT 'FK',
	FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE IF NOT EXISTS product_category (
    product_category_id CHAR(255) PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    product_id CHAR(255) PRIMARY KEY,
    barcode_id BIGINT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(8, 2) NULL,
    brand VARCHAR(255) NOT NULL,
    classification VARCHAR(255) NOT NULL,
    product_category_id CHAR(255) NOT NULL DEFAULT 'FK',
	FOREIGN KEY (product_category_id) REFERENCES product_category(product_category_id)
);

CREATE TABLE IF NOT EXISTS product_history (
    product_history_id CHAR(255) PRIMARY KEY,
    product_id CHAR(255) NOT NULL DEFAULT 'FK',
    old_bought_price DECIMAL(8, 2) NOT NULL,
    new_bought_price DECIMAL(8, 2) NOT NULL,
    old_selling_price DECIMAL(8, 2) NOT NULL,
    new_selling_price DECIMAL(8, 2) NOT NULL,
    change_datetime DATETIME NOT NULL,
    employee_id CHAR(255) NOT NULL DEFAULT 'FK',
	FOREIGN KEY (product_id) REFERENCES products(product_id),
	FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE IF NOT EXISTS product_inventory (
    inventory_id CHAR(255) PRIMARY KEY,
    product_id CHAR(255) NOT NULL DEFAULT 'FK',
    current_stock INT NOT NULL,
    minimum_stock_level INT NOT NULL,
    maximum_stock_level INT NOT NULL,
    last_stock_update DATETIME NOT NULL,
    reorder_level INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE IF NOT EXISTS order_details (
    order_id CHAR(255) NOT NULL,
    inventory_id CHAR(255) NOT NULL,
    expected_date DATE NOT NULL,
    actual_date DATE NOT NULL,
    order_quantity CHAR(255) NOT NULL,
    supplier_id CHAR(255) NOT NULL DEFAULT 'FK',
    PRIMARY KEY (order_id, inventory_id),
	FOREIGN KEY (order_id) REFERENCES orders(order_id),
	FOREIGN KEY (inventory_id) REFERENCES product_inventory(inventory_id),
	FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

CREATE TABLE IF NOT EXISTS transactions (
    transaction_id CHAR(255) PRIMARY KEY,
    transaction_datetime DATETIME NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    total_amount INT NOT NULL,
    employee_id CHAR(255) NOT NULL DEFAULT 'FK',
	FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE IF NOT EXISTS transaction_details (
    transaction_id CHAR(255),
    product_id CHAR(255),
    quantity INT NOT NULL,
    subtotal DECIMAL(8, 2) NOT NULL,
    PRIMARY KEY (transaction_id, product_id),
	FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
	FOREIGN KEY (product_id) REFERENCES products(product_id)
);


