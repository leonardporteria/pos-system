import dotenv from 'dotenv';
dotenv.config();

import {
  selectData,
  insertData,
  updateData,
  deleteData,
} from '../utils/crudOperations.js';

const tableName = 'product_inventory';

export async function selectProductInventory(req, res, next) {
  try {
    const productInventory = await selectData(tableName);
    console.log('Data fetched successfully:', productInventory);
    res.json(productInventory);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertProductInventory(req, res, next) {
  try {
    const result = await insertData(tableName, req.body);
    console.log('Data inserted successfully:', result);
    res.json({
      message: 'NEW PRODUCT INVENTORY ENTRY INSERTED',
      insertedData: result,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateProductInventory(req, res, next) {
  try {
    const result = await updateData(
      tableName,
      req.body,
      'inventory_id',
      req.params.inventory_id
    );

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({
        message: 'PRODUCT INVENTORY ENTRY UPDATED',
        updatedData: req.body,
      });
    } else {
      console.log('Product inventory entry not found for the given ID');
      res
        .status(404)
        .json({ error: 'Product inventory entry not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteProductInventory(req, res, next) {
  try {
    const result = await deleteData(
      tableName,
      'inventory_id',
      req.params.inventory_id
    );

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({
        message: 'PRODUCT INVENTORY ENTRY DELETED',
        deletedId: req.params.inventory_id,
      });
    } else {
      console.log('Product inventory entry not found for the given ID');
      res
        .status(404)
        .json({ error: 'Product inventory entry not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
