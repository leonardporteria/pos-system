import dotenv from 'dotenv';
dotenv.config();

import executeQuery from '../utils/executeQuery.js';

export async function selectSuppliers(req, res, next) {
  try {
    const selectQuery = 'SELECT * FROM suppliers';
    const [rows] = await executeQuery(selectQuery);
    console.log('Data fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertSupplier(req, res, next) {
  try {
    console.log('test');
    console.log(req.body);
    const {
      supplier_id,
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
    } = req.body;
    const query = `
      INSERT INTO suppliers 
      (supplier_id, supplier_name, supplier_contact, supplier_telephone, supplier_email, supplier_address)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await executeQuery(query, [
      supplier_id,
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
    ]);

    console.log('Data inserted successfully:', result[0]);
    req.insertedData = result[0];

    res.json({
      message: 'NEW SUPPLIER INSERTED',
      insertedData: req.insertedData,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateSupplier(req, res, next) {
  try {
    const {
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
    } = req.body;
    const { supplier_id } = req.params;

    const updateQuery = `
      UPDATE suppliers 
      SET 
        supplier_name = ?,
        supplier_contact = ?,
        supplier_telephone = ?,
        supplier_email = ?,
        supplier_address = ?
      WHERE supplier_id = ?
    `;
    const [result] = await executeQuery(updateQuery, [
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
      supplier_id,
    ]);

    if (result.affectedRows > 0) {
      console.log('Data updated successfully:', result);
      res.json({ message: 'SUPPLIER UPDATED', updatedData: req.body });
    } else {
      console.log('Supplier not found for the given ID');
      res.status(404).json({ error: 'Supplier not found for the given ID' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteSupplier(req, res, next) {
  try {
    const { supplier_id } = req.params;

    const deleteQuery = 'DELETE FROM suppliers WHERE supplier_id = ?';
    const [result] = await executeQuery(deleteQuery, [supplier_id]);

    if (result.affectedRows > 0) {
      console.log('Data deleted successfully:', result);
      res.json({ message: 'SUPPLIER DELETED', deletedId: supplier_id });
    } else {
      console.log('Supplier not found for the given ID');
      res.status(404).json({ error: 'Supplier not found for the given ID' });
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
