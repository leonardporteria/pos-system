import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import databaseRouter from './routes/databaseRoute.js';
import { createSchema } from './model/databaseSchema.js';

const PORT = process.env.PORT || 8080;

const app = express();

// * MIDDLEWARE
app.use(express.json());

app.use((err, req, res, next) => {
  console.log('MIDDLEWARE');
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

// * DATABASE INITIALIZATION
createSchema()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// * ROUTERS
// ROOT PATH: /api/
app.use('/api', databaseRouter);

//* CONNECTION
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}...`);
});
