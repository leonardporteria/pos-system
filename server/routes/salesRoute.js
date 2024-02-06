import express from 'express';
import executeQuery from '../utils/executeQuery.js';

const salesRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all sales
salesRouter.get('/sales', async (req, res) => {
  try {
    const [rows] = await executeQuery(
      `
      SELECT transaction_datetime, SUM(total_amount) as total_sale
      FROM transactions
      GROUP BY transaction_id;  
      `
    );

    res.json({
      message: 'SUM OF ALL SALES',
      sumOfSales: rows,
    });
  } catch (error) {
    console.error('Error querying data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default salesRouter;
