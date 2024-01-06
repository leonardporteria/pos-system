import { pool } from '../config/database.js';

export default async function insertSupplier(req, res, next) {
  try {
    const data = req.body;
    const connection = await pool.getConnection();
    const query = `INSERT INTO suppliers (supplier_id, supplier_name, supplier_contact, supplier_address, supplier_email)
                     VALUES (?, ?, ?, ?, ?)`;

    const result = await connection.query(query, [
      data.id,
      data.name,
      data.contact,
      data.tel,
      data.email,
      data.address,
    ]);

    // Release the connection back to the pool
    connection.release();

    console.log('Data inserted successfully:', result[0]);
    // Attach the result to the request object for potential use in subsequent middleware/routes
    req.insertedData = result[0];

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error inserting data:', error);
    // Handle the error as needed
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
