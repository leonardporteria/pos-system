import express from 'express';

const authRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all auth
authRouter.get('/auth', async (req, res) => {
  res.json({ message: 'GET all auth' });
});

// GET one auth by id
authRouter.get('/auth/:id', (req, res) => {
  res.json({ message: 'GET one auth' });
});

// POST new auth
authRouter.post('/auth', async (req, res) => {
  res.json({ message: 'POST new auth' });
});

// UPDATE new auth
authRouter.patch('/auth', async (req, res) => {
  res.json({ message: 'UPDATE new auth' });
});

export default authRouter;
