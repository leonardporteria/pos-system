import express from 'express';

import {
  insertSupplier,
  selectSuppliers,
  updateSupplier,
  deleteSupplier,
} from '../middleware/suppliers.js';

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

export default adminRouter;
