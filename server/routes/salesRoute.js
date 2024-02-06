import express from 'express';
import executeQuery from '../utils/executeQuery.js';

const salesRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all sales
salesRouter.get('/sales', async (req, res) => {
  try {
    const [interest] = await executeQuery(
      `
      SELECT 
      ph.product_id,
      p.product_name,
      SUM(ph.new_selling_price - ph.new_bought_price) AS revenue
      FROM 
          product_history ph
      JOIN 
          products p ON ph.product_id = p.product_id
      GROUP BY 
          ph.product_id, p.product_name;
      `
    );

    const [revenue] = await executeQuery(
      `
      SELECT 
          p.product_id,
          p.product_name,
          SUM((ph.new_selling_price - ph.new_bought_price) * td.quantity) AS total_profit,
          SUM(td.quantity) AS total_sold
      FROM 
          product_history ph
      JOIN 
          transaction_details td ON ph.product_id = td.product_id
      JOIN
          products p ON p.product_id = ph.product_id
      GROUP BY 
          p.product_id, p.product_name
      ORDER BY 
          total_sold DESC;
      `
    );

    const [totalProfit] = await executeQuery(
      `
      SELECT 
      SUM(total_profit) AS total_profit_all_products
      FROM
      (
          SELECT 
              p.product_id,
              p.product_name,
              SUM((ph.new_selling_price - ph.new_bought_price) * td.quantity) AS total_profit,
              SUM(td.quantity) AS total_sold
          FROM 
              product_history ph
          JOIN 
              transaction_details td ON ph.product_id = td.product_id
          JOIN
              products p ON p.product_id = ph.product_id
          GROUP BY 
              p.product_id, p.product_name
          ORDER BY 
              total_sold DESC
      ) AS subquery;
  
      `
    );

    res.json({
      message: 'SALES RESPONSE',
      interest: interest,
      revenue: revenue,
      totalProfit: totalProfit,
    });
  } catch (error) {
    console.error('Error querying data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default salesRouter;
