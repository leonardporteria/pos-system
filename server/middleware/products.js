import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'products';

export async function selectProducts(req, res, next) {
  try {
    const products = await selectData(tableName);
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function insertProduct(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    res.json({
      message: 'NEW PRODUCT INSERTED',
      insertedData: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'product_id',
      req.params.product_id
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'PRODUCT UPDATED', updatedData: req.body });
    } else {
      res.status(404).json({ error: 'Product not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'product_id',
      req.params.product_id
    );

    if (result.affectedRows > 0) {
      res.json({
        message: 'PRODUCT DELETED',
        deletedId: req.params.product_id,
      });
    } else {
      res.status(404).json({ error: 'Product not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}
