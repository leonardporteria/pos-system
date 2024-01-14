import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'suppliers';

export async function selectSuppliers(req, res, next) {
  try {
    const suppliers = await selectData(tableName);
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
}

export async function insertSupplier(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    res.json({
      message: 'NEW SUPPLIER INSERTED',
      insertedData: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSupplier(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'supplier_id',
      req.params.supplier_id
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'SUPPLIER UPDATED', updatedData: req.body });
    } else {
      res.status(404).json({ error: 'Supplier not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteSupplier(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'supplier_id',
      req.params.supplier_id
    );

    if (result.affectedRows > 0) {
      res.json({
        message: 'SUPPLIER DELETED',
        deletedId: req.params.supplier_id,
      });
    } else {
      res.status(404).json({ error: 'Supplier not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}
