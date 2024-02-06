import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

// * IMPORTS
import authRouter from './routes/authRoute.js';
import adminRouter from './routes/adminRoute.js';
import salesRouter from './routes/salesRoute.js';

import { createSchema } from './model/databaseSchema.js';

// * MIDDLEWARE
const app = express();

const PORT = process.env.PORT || 8080;

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
app.use('/api', authRouter);
app.use('/api', adminRouter);
app.use('/api', salesRouter);

//* CONNECTION
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}...`);
});
