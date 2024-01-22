import dotenv from 'dotenv';
dotenv.config();

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
