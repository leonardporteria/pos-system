import express from 'express';

import errorHandler from '../utils/routeErrorHandler.js';

import {
  insertSupplier,
  selectSuppliers,
  updateSupplier,
  deleteSupplier,
} from '../middleware/suppliers.js';

import {
  insertOrder,
  selectOrders,
  updateOrder,
  deleteOrder,
} from '../middleware/orders.js';

import {
  insertOrderDetail,
  selectOrderDetails,
  updateOrderDetail,
  deleteOrderDetail,
} from '../middleware/orderDetails.js';

import {
  insertProduct,
  selectProducts,
  updateProduct,
  deleteProduct,
} from '../middleware/products.js';

import {
  insertProductCategory,
  selectProductCategories,
  updateProductCategory,
  deleteProductCategory,
} from '../middleware/productCategory.js';

import {
  insertProductInventory,
  selectProductInventory,
  updateProductInventory,
  deleteProductInventory,
} from '../middleware/productInventory.js';

import {
  insertProductHistory,
  selectProductHistory,
  updateProductHistory,
  deleteProductHistory,
} from '../middleware/productHistory.js';

import {
  insertRole,
  selectRoles,
  updateRole,
  deleteRole,
} from '../middleware/role.js';

import {
  insertEmployee,
  selectEmployees,
  updateEmployee,
  deleteEmployee,
} from '../middleware/employees.js';

import {
  insertTransaction,
  selectTransactions,
  updateTransaction,
  deleteTransaction,
} from '../middleware/transactions.js';

import {
  insertTransactionDetail,
  selectTransactionDetails,
  updateTransactionDetail,
  deleteTransactionDetail,
} from '../middleware/transactionDetails.js';

const adminRouter = express.Router();

/**
 * ROOT PATH: /api
 */

// ? SUPPLIERS
// * GET ALL SUPPLIERS
adminRouter.get('/admin/suppliers', selectSuppliers);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/suppliers', insertSupplier);
// * EDIT ONE SUPPLIER
adminRouter.put('/admin/suppliers/:supplier_id', updateSupplier);
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/suppliers/:supplier_id', deleteSupplier);

// ? ORDERS
// * GET ALL ORDERS
adminRouter.get('/admin/orders', selectOrders);
// * INSERT NEW ORDERS
adminRouter.post('/admin/orders', insertOrder);
// * EDIT ONE ORDERS
adminRouter.put('/admin/orders/:order_id', updateOrder);
// * DELETE ONE ORDERS
adminRouter.delete('/admin/orders/:order_id', deleteOrder);

// ? ODRDER DETAILS
// * GET ALL ODRDER DETAILS
adminRouter.get('/admin/order_details', selectOrderDetails);
// * INSERT NEW ODRDER DETAILS
adminRouter.post('/admin/order_details', insertOrderDetail);
// * EDIT ONE ODRDER DETAILS
adminRouter.put(
  '/admin/order_details/:order_id/:inventory_id',
  updateOrderDetail
);
// * DELETE ONE ODRDER DETAILS
adminRouter.delete(
  '/admin/order_details/:order_id/:inventory_id',
  deleteOrderDetail
);

// ? PRODUCTS
// * GET ALL PRODUCTS
adminRouter.get('/admin/products', selectProducts);
// * INSERT NEW PRODUCTS
adminRouter.post('/admin/products', insertProduct);
// * EDIT ONE PRODUCTS
adminRouter.put('/admin/products/:product_id', updateProduct);
// * DELETE ONE PRODUCTS
adminRouter.delete('/admin/products/:product_id', deleteProduct);

// ? PRODUCT CATEGORY
// * GET ALL PRODUCT CATEGORY
adminRouter.get('/admin/product_category', selectProductCategories);
// * INSERT NEW PRODUCT CATEGORY
adminRouter.post('/admin/product_category', insertProductCategory);
// * EDIT ONE PRODUCT CATEGORY
adminRouter.put(
  '/admin/product_category/:product_category_id',
  updateProductCategory
);
// * DELETE ONE PRODUCT CATEGORY
adminRouter.delete(
  '/admin/product_category/:product_category_id',
  deleteProductCategory
);

// ? PRODUCT INVENTORY
// * GET ALL PRODUCT INVENTORY
adminRouter.get('/admin/product_inventory', selectProductInventory);
// * INSERT NEW PRODUCT INVENTORY
adminRouter.post('/admin/product_inventory', insertProductInventory);
// * EDIT ONE PRODUCT INVENTORY
adminRouter.put(
  '/admin/product_inventory/:inventory_id',
  updateProductInventory
);
// * DELETE ONE PRODUCT INVENTORY
adminRouter.delete(
  '/admin/product_inventory/:inventory_id',
  deleteProductInventory
);

// ? PRODUCT HISTORY
// * GET ALL PRODUCT HISTORY
adminRouter.get('/admin/product_history', selectProductHistory);
// * INSERT NEW PRODUCT HISTORY
adminRouter.post('/admin/product_history', insertProductHistory);
// * EDIT ONE PRODUCT HISTORY
adminRouter.put(
  '/admin/product_history/:product_history_id',
  updateProductHistory
);
// * DELETE ONE PRODUCT HISTORY
adminRouter.delete(
  '/admin/product_history/:product_history_id',
  deleteProductHistory
);

// ? EMPLOYEES
// * GET ALL EMPLOYEES
adminRouter.get('/admin/employees', selectEmployees);
// * INSERT NEW EMPLOYEES
adminRouter.post('/admin/employees', insertEmployee);
// * EDIT ONE EMPLOYEES
adminRouter.put('/admin/employees/:employee_id', updateEmployee);
// * DELETE ONE EMPLOYEES
adminRouter.delete('/admin/employees/:employee_id', deleteEmployee);

// ? ROLES
// * GET ALL ROLES
adminRouter.get('/admin/roles', selectRoles);
// * INSERT NEW ROLES
adminRouter.post('/admin/roles', insertRole);
// * EDIT ONE ROLES
adminRouter.put('/admin/roles/:role_id', updateRole);
// * DELETE ONE ROLES
adminRouter.delete('/admin/roles/:role_id', deleteRole);

// ? TRANSACTIONS
// * GET ALL TRANSACTIONS
adminRouter.get('/admin/transactions', selectTransactions);
// * INSERT NEW TRANSACTIONS
adminRouter.post('/admin/transactions', insertTransaction);
// * EDIT ONE TRANSACTIONS
adminRouter.put('/admin/transactions/:transaction_id', updateTransaction);
// * DELETE ONE TRANSACTIONS
adminRouter.delete('/admin/transactions/:transaction_id', deleteTransaction);

// ? TRANSCATION DETAILS
// * GET ALL TRANSCATION DETAILS
adminRouter.get('/admin/transaction_details', selectTransactionDetails);
// * INSERT NEW TRANSCATION DETAILS
adminRouter.post('/admin/transaction_details', insertTransactionDetail);
// * EDIT ONE TRANSCATION DETAILS
adminRouter.put(
  '/admin/transaction_details/:transaction_id/:product_id',
  updateTransactionDetail
);
// * DELETE ONE TRANSCATION DETAILS
adminRouter.delete(
  '/admin/transaction_details/:transaction_id/:product_id',
  deleteTransactionDetail
);

// ?  ERROR HANDLER
adminRouter.use(errorHandler);

export default adminRouter;
