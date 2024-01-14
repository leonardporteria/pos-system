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
// * GET ALL SUPPLIERS
adminRouter.get('/admin/products', selectProducts);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/products', insertProduct);
// * EDIT ONE SUPPLIER
adminRouter.put('/admin/products/:product_id', updateProduct);
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/products/:product_id', deleteProduct);

// ? PRODUCT CATEGORY
// * GET ALL SUPPLIERS
adminRouter.get('/admin/product_category', selectProductCategories);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/product_category', insertProductCategory);
// * EDIT ONE SUPPLIER
adminRouter.put(
  '/admin/product_category/:product_category_id',
  updateProductCategory
);
// * DELETE ONE SUPPLIER
adminRouter.delete(
  '/admin/product_category/:product_category_id',
  deleteProductCategory
);

// ? EMPLOYEES
// * GET ALL SUPPLIERS
adminRouter.get('/admin/employees', selectEmployees);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/employees', insertEmployee);
// * EDIT ONE SUPPLIER
adminRouter.put('/admin/employees/:employee_id', updateEmployee);
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/employees/:employee_id', deleteEmployee);

// ? ROLES
// * GET ALL SUPPLIERS
adminRouter.get('/admin/roles', selectRoles);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/roles', insertRole);
// * EDIT ONE SUPPLIER
adminRouter.put('/admin/roles/:role_id', updateRole);
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/roles/:role_id', deleteRole);

// ?  ERROR HANDLER
adminRouter.use(errorHandler);

export default adminRouter;
