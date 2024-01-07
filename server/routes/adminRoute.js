import express from 'express';

import { pool } from '../config/database.js';

import insertSupplier from '../middleware/insertSupplier.js';
import selectSuppliers from '../middleware/selectSuppliers.js';

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
adminRouter.put('/admin/suppliers/:supplier_id');
// * DELETE ONE SUPPLIER
adminRouter.delete('/admin/suppliers/:supplier_id');

export default adminRouter;
