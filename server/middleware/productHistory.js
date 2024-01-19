import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'product_history';

export async function selectProductHistory(req, res, next) {
  try {
    const productHistory = await selectData(tableName);
    console.log('Data fetched successfully:', productHistory);
    res.json(productHistory);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertProductHistory(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW PRODUCT HISTORY ENTRY INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateProductHistory(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'product_history_id',
      req.params.product_history_id
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({
        message: 'PRODUCT HISTORY ENTRY UPDATED',
        updatedData: req.body,
      });
    } else {
      console.log('Product history entry not found for the given ID');
      res
        .status(404)
        .json({ error: 'Product history entry not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteProductHistory(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'product_history_id',
      req.params.product_history_id
    );

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({
        message: 'PRODUCT HISTORY ENTRY DELETED',
        deletedId: req.params.product_history_id,
      });
    } else {
      console.log('Product history entry not found for the given ID');
      res
        .status(404)
        .json({ error: 'Product history entry not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
