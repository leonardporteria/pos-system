import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'product_category';

export async function selectProductCategories(req, res, next) {
  try {
    const productCategories = await selectData(tableName);
    res.json(productCategories);
  } catch (error) {
    next(error);
  }
}

export async function insertProductCategory(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    res.json({
      message: 'NEW PRODUCT CATEGORY INSERTED',
      insertedData: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProductCategory(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'product_category_id',
      req.params.product_category_id
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'PRODUCT CATEGORY UPDATED', updatedData: req.body });
    } else {
      res
        .status(404)
        .json({ error: 'Product category not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteProductCategory(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'product_category_id',
      req.params.product_category_id
    );

    if (result.affectedRows > 0) {
      res.json({
        message: 'PRODUCT CATEGORY DELETED',
        deletedId: req.params.product_category_id,
      });
    } else {
      res
        .status(404)
        .json({ error: 'Product category not found for the given ID' });
    }
  } catch (error) {
    next(error);
  }
}
