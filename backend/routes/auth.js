import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const router = express.Router();

/**
 * @route POST api/auth/signup
 * @desc Register user
 * @access Public
 * @returns {token}
 */
router.post('/signup', [
  body('firstName').not().isEmpty().withMessage('First name is required').trim().escape(),
  body('lastName').not().isEmpty().withMessage('Last name is required').trim().escape(),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('userName').not().isEmpty().withMessage('User name is required').trim().escape(),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
  body('contactNo').not().isEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid contact number format').trim().escape(),
  body('password').isLength({ min: 1 }).withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, userName, age, contactNo, password } = req.body;

  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Username already exists' }] });
    }

    user = new User({ firstName, lastName, email, userName, age, contactNo, password });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = user.genToken();
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
);

/**
 * @route POST api/auth/login
 * @desc Login user
 * @access Public
 * @returns {token}
 */
router.post('/login', [
  body('userName').not().isEmpty().withMessage('User name is required').trim().escape(),
  body('password').isLength({ min: 1 }).withMessage('Password is required').escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.genToken();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

)

/*
  user1 token
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNmM4ZTJjNzg0ZmJiYzcyZjQ3YTBmIn0sImlhdCI6MTY3NzExNzY2NiwiZXhwIjoxNjc5NzA5NjY2fQ.x--BlgnWEYlvYumh2OnTCfDaBlOCHQlactZKPcSMaxQ"
  user 2 token
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmNmNjNWU1NDdiNDQzMDljZGEyNzczIn0sImlhdCI6MTY3NzExODU1OCwiZXhwIjoxNjc5NzEwNTU4fQ.wcherVYO4Tl7Sd81Kg9OYYUsuEMDhBityVF7urwyByc"
*/

export default router;