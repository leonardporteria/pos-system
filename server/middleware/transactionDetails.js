import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'transaction_details';

export async function selectTransactionDetails(req, res, next) {
  try {
    const transactionDetails = await selectData(tableName);
    console.log('Data fetched successfully:', transactionDetails);
    res.json(transactionDetails);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertTransactionDetail(req, res, next) {
  try {
    const [rows] = await executeQuery(
      `
      SELECT unit_price
      FROM products
      WHERE product_id = '${req.body.product_id}'
      `
    );

    req.body.subtotal = req.body.quantity * parseFloat(rows[0].unit_price);

    await executeQuery(
      `
      UPDATE product_inventory
      SET current_stock = current_stock - ${req.body.quantity},
      last_stock_update = CURRENT_TIMESTAMP
      WHERE product_id ='${req.body.product_id}';      
      `
    );

    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW TRANSACTION DETAIL INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateTransactionDetail(req, res, next) {
  try {
    const [rows] = await executeQuery(
      `
      SELECT unit_price
      FROM products
      WHERE product_id = '${req.body.product_id}'
      `
    );

    req.body.subtotal = req.body.quantity * parseFloat(rows[0].unit_price);

    const result = await updateData(
      tableName,
      req.body,
      ['transaction_id', 'product_id'],
      [req.params.transaction_id, req.params.product_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({
        message: 'TRANSACTION DETAIL UPDATED',
        updatedData: req.body,
      });
    } else {
      console.log('Transaction detail not found for the given ID');
      res
        .status(404)
        .json({ error: 'Transaction detail not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteTransactionDetail(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      ['transaction_id', 'product_id'],
      [req.params.transaction_id, req.params.product_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({
        message: 'TRANSACTION DETAIL DELETED',
        deletedId: req.params,
      });
    } else {
      console.log('Transaction detail not found for the given ID');
      res
        .status(404)
        .json({ error: 'Transaction detail not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
