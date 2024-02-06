import express from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

import executeQuery from '../utils/executeQuery.js';

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
  const [rows] = await executeQuery(`
    SELECT * 
    FROM employees;
  `);

  const usersFromDatabase = rows.map((employee, index) => {
    let role = '';
    switch (employee.role_id) {
      case 'ROLE-0001':
        role = 'admin';
        break;
      case 'ROLE-0002':
        role = 'manager';
        break;
      case 'ROLE-0003':
        role = 'cashier';
        break;
      default:
        role = 'guest';
    }
    return {
      id: index + 1,
      username: employee.username,
      password: employee.password,
      role: role,
    };
  });

  const adminIndex = usersFromDatabase.findIndex(
    (user) => user.role === 'admin'
  );

  console.log(req.body);

  const users = [
    {
      id: 0,
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    },
    ...usersFromDatabase.slice(0, adminIndex + 1),
    ...usersFromDatabase.slice(adminIndex + 1),
  ];

  console.log(users);

  const { username, password, role } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

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
