import express from 'express';

import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * @route GET api/follower/remove/:id
 * @desc Get follower
 * @access Private
 * @returns {follower}
 */
router.post('/remove/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // remove follower from this user's followers list
    const follower = await User.findById(req.params.id);
    if (!follower) {
      console.log('Follower not found')
      return res.status(404).json({ msg: 'Follower not found' });
    }
    const index = user.followers.findIndex(follower => follower.userid == req.params.id);
    if (index > -1) {
      user.followers.splice(index, 1);
    }
    await user.save();
    
    // remove this user from follower's following list
    const index2 = follower.following.findIndex(following => following.userid == req.user.id);
    if (index2 > -1) {
      follower.following.splice(index2, 1);
    }
    await follower.save();
    
    res.status(200).json(user);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


export default router;