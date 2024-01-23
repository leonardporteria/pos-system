import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'order_details';

export async function selectOrderDetails(req, res, next) {
  try {
    const orderDetails = await selectData(tableName);
    console.log('Data fetched successfully:', orderDetails);
    res.json(orderDetails);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertOrderDetail(req, res, next) {
  try {
    await executeQuery(
      `
      UPDATE product_inventory
      SET current_stock = current_stock + ${req.body.order_quantity}
      WHERE inventory_id ='${req.body.inventory_id}';      
      `
    );

    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW ORDER DETAIL INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateOrderDetail(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      ['order_id', 'inventory_id'],
      [req.params.order_id, req.params.inventory_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'ORDER DETAIL UPDATED', updatedData: req.body });
    } else {
      console.log('Order detail not found for the given ID');
      res
        .status(404)
        .json({ error: 'Order detail not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteOrderDetail(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      ['order_id', 'inventory_id'],
      [req.params.order_id, req.params.inventory_id]
    );

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({
        message: 'ORDER DETAIL DELETED',
        deletedId: {
          order_id: req.params.order_id,
          inventory_id: req.params.inventory_id,
        },
      });
    } else {
      console.log('Order detail not found for the given ID');
      res
        .status(404)
        .json({ error: 'Order detail not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
