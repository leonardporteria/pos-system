import { pool } from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config();

export async function selectSuppliers(req, res, next) {
  try {
    const connection = await pool.getConnection();
    const selectQuery = 'SELECT * FROM suppliers';
    const [rows] = await connection.query(selectQuery);
    connection.release();
    console.log('Data fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function insertSupplier(req, res, next) {
  try {
    await pool.query(`USE ${process.env.MYSQL_DATABASE};`);
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
