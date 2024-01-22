import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'transactions';

export async function selectTransactions(req, res, next) {
  try {
    const transactions = await selectData(tableName);
    console.log('Data fetched successfully:', transactions);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertTransaction(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW TRANSACTION INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateTransaction(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      ['transaction_id'],
      [req.params.transaction_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'TRANSACTION UPDATED', updatedData: req.body });
    } else {
      console.log('Transaction not found for the given ID');
      res.status(404).json({ error: 'Transaction not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteTransaction(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      ['transaction_id'],
      [req.params.transaction_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({
        message: 'TRANSACTION DELETED',
        deletedId: req.params.transaction_id,
      });
    } else {
      console.log('Transaction not found for the given ID');
      res.status(404).json({ error: 'Transaction not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
