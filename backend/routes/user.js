import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is a user get request');
});

export default router;