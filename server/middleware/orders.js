import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'orders';

export async function selectOrders(req, res, next) {
  try {
    const orders = await selectData(tableName);
    console.log('Data fetched successfully:', orders);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertOrder(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW ORDER INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateOrder(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'order_id',
      req.params.order_id
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'ORDER UPDATED', updatedData: req.body });
    } else {
      console.log('Order not found for the given ID');
      res.status(404).json({ error: 'Order not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteOrder(req, res, next) {
  try {
    const result = await deleteData(tableName, 'order_id', req.params.order_id);

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({ message: 'ORDER DELETED', deletedId: req.params.order_id });
    } else {
      console.log('Order not found for the given ID');
      res.status(404).json({ error: 'Order not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
