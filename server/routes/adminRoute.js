import express from 'express';

const adminRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all admin
adminRouter.get('/admin', async (req, res) => {
  res.json({ message: 'GET all admin' });
});

// GET one admin by id
adminRouter.get('/admin/:id', (req, res) => {
  res.json({ message: 'GET one admin' });
});

// POST new admin
adminRouter.post('/admin', async (req, res) => {
  res.json({ message: 'POST new admin' });
});

// UPDATE new admin
adminRouter.patch('/admin', async (req, res) => {
  res.json({ message: 'UPDATE new admin' });
});

export default adminRouter;
