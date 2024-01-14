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

// ? EMPLOYEES
// * GET ALL SUPPLIERS
adminRouter.get('/admin/products', selectEmployees);
// * INSERT NEW SUPPLIER
adminRouter.post('/admin/products', insertEmployee);
// * EDIT ONE SUPPLIER
adminRouter.put('/admin/products/:product_id', updateEmployee);
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/products/:product_id', deleteEmployee);

// ?  ERROR HANDLER
adminRouter.use(errorHandler);

export default adminRouter;
