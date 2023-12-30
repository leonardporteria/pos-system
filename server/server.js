import express from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
dotenv.config();

// * IMPORTS
import databaseRouter from './routes/databaseRoute.js';
import { createSchema } from './model/databaseSchema.js';

// * CONFIG
const PORT = process.env.PORT || 8080;
const LIMITER_TIMEOUT = 15;
const LIMITER_LIMIT = 5;

const limiter = rateLimit({
  windowMs: LIMITER_TIMEOUT * 60 * 1000,
  max: LIMITER_LIMIT,
  message: 'Too many attempts, please try again later.',
});

// * MIDDLEWARE
const app = express();

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
app.use('/api', limiter, databaseRouter);

//* CONNECTION
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}...`);
});
