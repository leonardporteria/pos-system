import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

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

    for (const transaction of transactions) {
      const [rows] = await executeQuery(
        `
    SELECT SUM(subtotal) AS grand_total
    FROM transaction_details
    WHERE transaction_id = '${transaction.transaction_id}'
    `
      );

      transaction.total_amount = rows[0].grand_total || 0;
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertTransaction(req, res, next) {
  try {
    const [rows] = await executeQuery(
      `
      SELECT SUM(subtotal) AS grand_total
      FROM transaction_details
      WHERE transaction_id = '${req.body.transaction_id}'
      `
    );

    req.body.total_amount = rows[0].grand_total || 0;

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
