import express from 'express';

import { pool } from '../config/database.js';

import insertSupplier from '../middleware/insertSupplier.js';
import selectSuppliers from '../middleware/selectSuppliers.js';

const adminRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// * GET ALL SUPPLIERS
adminRouter.get('/admin/suppliers', selectSuppliers, (req, res) => {
  res.json({
    message: 'ALL SUPPLIERS SELECTED',
  });
});

// * INSERT NEW SUPPLIER
adminRouter.post('/admin/suppliers', insertSupplier, (req, res) => {
  console.log(req.body);
  res.json({
    message: 'NEW SUPPLIER INSERTED',
    insertedData: req.insertedData,
  });
});

export default adminRouter;
