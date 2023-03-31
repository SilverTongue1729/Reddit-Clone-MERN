import express from 'express';
import { body, validationResult } from 'express-validator';

import auth from '../middleware/auth.js';
import Subgreddiit from '../models/Subgreddiit.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

const router = express.Router();

/**
 * @route GET api/post
 * @desc Create post
 * @access Private -> must be a member of the subgreddiit
 * @returns {post}
 */
router.post('/create', auth, [
  body('text').notEmpty().withMessage('Text is required').escape(),
  body('subgreddiitId').notEmpty().withMessage('Subgreddiit ID is required').escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { text, subgreddiitId } = req.body;
  const userId = req.user.id;
  
  try {
    let subgreddiit = await Subgreddiit.findById(subgreddiitId);
    if (!subgreddiit) {
      return res.status(400).json({ errors: [{ msg: 'Subgreddiit does not exist' }] });
    }
    
    let user = await User.findById(req.user.id);
    const subgreddiitStatus = user.subgreddiits.find(subgreddiit => subgreddiit.subgreddiitId.toString() === subgreddiitId);
    
    if (!subgreddiitStatus || (subgreddiitStatus.status !== 'joined' && subgreddiitStatus.status !== 'moderator')) {
      return res.status(400).json({ errors: [{ msg: 'User is not a member of this subgreddiit' }] });
    }
              
    let post = new Post({ text, userId, subgreddiitId });
    subgreddiit.posts.push(post._id);
    
    await post.save();
    await subgreddiit.save();
    
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



/**
 * @route GET api/post
 * @desc Get post
 * @access Private
 * @returns {post}
 */
router.get('/:id', auth, async (req, res) => {
  
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ errors: [{ msg: 'Post does not exist' }] });
    }
        
    let subgreddiit = await Subgreddiit.findById(post.subgreddiitId);
            
    let bannedWords = subgreddiit.bannedWords;
    let text = post.text;
    
    if (bannedWords) {
      bannedWords.forEach(bannedWord => {
        text = text.replace(bannedWord, '*'.repeat(bannedWord.length));
      });
    }
    
    post.text = text;
    
    res.status(200).json(post);
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

  
export default router;