import express from 'express';
import { body, validationResult } from 'express-validator';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * @route GET api/user
 * @desc Get user
 * @access Private
 * @returns {user}
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/one/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


/**
 * @route POST api/user/edit
 * @desc Edit user
 * @access Private
 * @returns {user}
 */
router.post('/edit', auth, [
  body('firstName').not().isEmpty().withMessage('First name is required').trim().escape(),
  body('lastName').not().isEmpty().withMessage('Last name is required').trim().escape(),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('userName').not().isEmpty().withMessage('User name is required').trim().escape(),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
  body('contactNo').not().isEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid contact number format').trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, userName, age, contactNo} = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.userName = userName;
    user.age = age;
    user.contactNo = contactNo;

    await user.save();

    const token = user.genToken();
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;