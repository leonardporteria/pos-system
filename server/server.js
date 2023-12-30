import express from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

import databaseRouter from './routes/databaseRoute.js';
import { createSchema } from './model/databaseSchema.js';

const PORT = process.env.PORT || 8080;

const app = express();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

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
app.use('/api', loginLimiter, databaseRouter);

//* CONNECTION
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}...`);
});
