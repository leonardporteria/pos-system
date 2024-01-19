import express from 'express';

import errorHandler from '../utils/routeErrorHandler.js';

import {
  insertSupplier,
  selectSuppliers,
  updateSupplier,
  deleteSupplier,
} from '../middleware/suppliers.js';

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

// ?  ERROR HANDLER
adminRouter.use(errorHandler);

export default adminRouter;
