import { pool } from '../config/database.js';

export default async function insertSupplier(req, res, next) {
  try {
    const {
      supplier_id,
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
    } = req.body;
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO suppliers 
      (supplier_id, supplier_name, supplier_contact, supplier_telephone, supplier_email, supplier_address)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await connection.query(query, [
      supplier_id,
      supplier_name,
      supplier_contact,
      supplier_telephone,
      supplier_email,
      supplier_address,
    ]);

    connection.release();

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