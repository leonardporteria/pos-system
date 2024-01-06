import { pool } from '../config/database.js';

export default async function selectSuppliers(req, res, next) {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Select query
    const selectQuery = 'SELECT * FROM suppliers';

    // Execute the query
    const [rows] = await connection.query(selectQuery);

    // Release the connection back to the pool
    connection.release();

    console.log('Data fetched successfully:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
