import express from 'express';
import executeQuery from '../utils/executeQuery.js';

const dashboardRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all sales
dashboardRouter.get('/dashboard', async (req, res) => {
  try {
    const [transactionsCount] = await executeQuery(
      `
      SELECT COUNT(*) AS transactionsCount
      FROM transaction_details; 
      `
    );

    const [ordersCount] = await executeQuery(
      `
        SELECT COUNT(*) AS ordersCount
        FROM order_details;
        `
    );

    const [productCount] = await executeQuery(
      `
        SELECT COUNT(*) AS productCount
        FROM products;
        `
    );

    const [revenue] = await executeQuery(
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

    const [orderTotal] = await executeQuery(
      `
      SELECT order_id, SUM(order_quantity * unit_price) AS total_price
      FROM order_details
      JOIN product_inventory ON order_details.inventory_id = product_inventory.inventory_id
      JOIN products ON product_inventory.product_id = products.product_id
      GROUP BY order_id;
        `
    );

    const [topSelling] = await executeQuery(
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

    res.json({
      message: 'DASHBOARD FETCH',
      transactionsCount: transactionsCount,
      ordersCount: ordersCount,
      productCount: productCount,
      revenue: revenue,
      orderTotal: orderTotal,
      topSelling: topSelling,
    });
  } catch (error) {
    console.error('Error querying data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default dashboardRouter;
