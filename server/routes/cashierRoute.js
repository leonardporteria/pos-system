import express from 'express';

const cashierRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all cashier
cashierRouter.get('/cashier', async (req, res) => {
  res.json({ message: 'GET all cashier' });
});

// GET one cashier by id
cashierRouter.get('/cashier/:id', (req, res) => {
  res.json({ message: 'GET one cashier' });
});

// POST new cashier
cashierRouter.post('/cashier', async (req, res) => {
  res.json({ message: 'POST new cashier' });
});

// UPDATE new cashier
cashierRouter.patch('/cashier', async (req, res) => {
  res.json({ message: 'UPDATE new cashier' });
});

export default cashierRouter;
