import { pool } from '../config/database.js';

export default async function selectSuppliers(req, res, next) {
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
