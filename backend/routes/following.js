import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/remove/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }

    // remove following from this user's followings list
    const following = await User.findById(req.params.id);
    if (!following) {
      console.log('following not found')
      return res.status(404).json({ msg: 'following not found' });
    }
    const index = user.following.findIndex(following => following.userid == req.params.id);
    if (index > -1) {
      user.following.splice(index, 1);
    }
    await user.save();
    
    // remove this user from following's followers list
    const index2 = following.followers.findIndex(follower => follower.userid == req.user.id);
    if (index2 > -1) {
      following.followers.splice(index2, 1);
    }
    await following.save();
    
    res.status(200).json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;