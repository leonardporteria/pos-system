import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

// Middleware to select all products
export async function selectProducts(req, res, next) {
  try {
    const selectQuery = 'SELECT * FROM products';
    const [rows] = await executeQuery(selectQuery);
    console.log('Data fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to insert a new product
export async function insertProduct(req, res, next) {
  try {
    const {
      product_id,
      barcode_id,
      product_name,
      unit_price,
      brand,
      classification,
      product_category_id,
    } = req.body;
    const query = `
      INSERT INTO products 
      (product_id, barcode_id, product_name, unit_price, brand, classification, product_category_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result = await executeQuery(query, [
      product_id,
      barcode_id,
      product_name,
      unit_price,
      brand,
      classification,
      product_category_id,
    ]);

    console.log('Data inserted successfully:', result[0]);
    req.insertedData = result[0];

    res.json({
      message: 'NEW PRODUCT INSERTED',
      insertedData: req.insertedData,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to update a product by ID
export async function updateProduct(req, res, next) {
  try {
    const {
      barcode_id,
      product_name,
      unit_price,
      brand,
      classification,
      product_category_id,
    } = req.body;
    const { product_id } = req.params;

    const updateQuery = `
      UPDATE products 
      SET 
        barcode_id = ?,
        product_name = ?,
        unit_price = ?,
        brand = ?,
        classification = ?,
        product_category_id = ?
      WHERE product_id = ?
    `;
    const [result] = await executeQuery(updateQuery, [
      barcode_id,
      product_name,
      unit_price,
      brand,
      classification,
      product_category_id,
      product_id,
    ]);

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'PRODUCT UPDATED', updatedData: req.body });
    } else {
      console.log('Product not found for the given ID');
      res.status(404).json({ error: 'Product not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Middleware to delete a product by ID
export async function deleteProduct(req, res, next) {
  try {
    const { product_id } = req.params;

    const deleteQuery = 'DELETE FROM products WHERE product_id = ?';
    const [result] = await executeQuery(deleteQuery, [product_id]);

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({ message: 'PRODUCT DELETED', deletedId: product_id });
    } else {
      console.log('Product not found for the given ID');
      res.status(404).json({ error: 'Product not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
