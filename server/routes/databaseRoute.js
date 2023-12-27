import express from 'express';

const databaseRouter = express.Router();

/**
 * ROOT PATH: /api
 */
// GET all database
databaseRouter.get('/database', async (req, res) => {
  res.json({ message: 'GET all database' });
});

// GET one database by id
databaseRouter.get('/database/:id', (req, res) => {
  res.json({ message: 'GET one database' });
});

// POST new database
databaseRouter.post('/database', async (req, res) => {
  res.json({ message: 'POST new database' });
});

// UPDATE new database
databaseRouter.patch('/database', async (req, res) => {
  res.json({ message: 'UPDATE new database' });
});

export default databaseRouter;
