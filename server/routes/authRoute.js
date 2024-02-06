import express from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

import dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// * RATE LIMITER CONFIG
const LIMITER_TIMEOUT = 15;
const LIMITER_LIMIT = 5;

const limiter = rateLimit({
  windowMs: LIMITER_TIMEOUT * 60 * 1000,
  max: LIMITER_LIMIT,
  message: 'Too many attempts, please try again later.',
});

const users = [
  {
    id: 1,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin',
  },
  {
    id: 2,
    username: 'manager',
    password: 'password',
    role: 'manager',
  },
  {
    id: 3,
    username: 'cashier',
    password: 'password',
    role: 'cashier',
  },
];

// Middleware to verify JWT
const verifyTokenAndRole = (role) => (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    }

    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: 'Unauthorized: Insufficient role' });
    }

    req.user = user;
    next();
  });
};

/**
 * ROOT PATH: /api
 */
// GET all auth (protected route)
authRouter.get(
  '/auth',
  limiter,
  verifyTokenAndRole('admin'),
  async (req, res) => {
    // Access user information through req.user
    res.json({ message: 'GET all auth', user: req.user });
  }
);

// GET one auth by id (protected route)
authRouter.get(
  '/auth/:id',
  limiter,
  verifyTokenAndRole('admin'),
  (req, res) => {
    // Access user information through req.user
    res.json({ message: 'GET one auth', user: req.user });
  }
);

// POST new auth (public route)
authRouter.post('/auth', limiter, async (req, res) => {
  // Handle authentication logic and issue JWT token
  const { username, password, role } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  console.log(req.body);
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the user has the required role
  if (role !== user.role) {
    return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ message: 'POST new auth', token });
});

// UPDATE new auth (protected route)
authRouter.patch(
  '/auth',
  limiter,
  verifyTokenAndRole('admin'),
  async (req, res) => {
    res.json({ message: 'UPDATE new auth', user: req.user });
  }
);

export default authRouter;
