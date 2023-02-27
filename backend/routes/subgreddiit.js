import express from 'express';
import { body, validationResult } from 'express-validator';

import auth from '../middleware/auth.js';
import Subgreddiit from '../models/Subgreddiit.js';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Report from '../models/Report.js';

const router = express.Router();

/**
 * @route GET api/subgreddiit
 * @desc Get subgreddiit
 * @access Private
 * @returns {subgreddiit}
 */
router.post('/create', auth, [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required').escape(),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('bannedWords').optional().isArray().withMessage('Banned words must be an array')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, tags, bannedWords } = req.body;
  const users = [{ userId: req.user.id, status: 'moderator' }]

  try {
    let subgreddiit = await Subgreddiit.findOne({ name });
    if (subgreddiit) {
      return res.status(400).json({ errors: [{ msg: 'Subgreaddiit with same name already exists' }] });
    }

    subgreddiit = new Subgreddiit({ name, description, tags, bannedWords, moderatorId: req.user.id, users });
    let user = await User.findById(req.user.id);
    user.subgreddiits.push({ subgreddiitId: subgreddiit._id, status: 'moderator' });

    await user.save();
    await subgreddiit.save();

    res.status(201).json(subgreddiit);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/subgreddiit
 * @desc Get all subgreddiits
 * @access Private
 * @returns {subgreddiit}
 */
router.get('/list', auth, async (req, res) => {
  try {
    const subgreddiits = await Subgreddiit.find();
    res.json(subgreddiits);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/subgreddiit
 * @desc Get subgreddiit
 * @access Private
 * @returns {subgreddiit}
 */
router.post('/list/:id', auth, async (req, res) => {
  try {
    console.log("req.params.id: ", req.params.id)
    const subgreddiit = await Subgreddiit.findById(req.params.id);
    res.json(subgreddiit);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET api/subgreddiit
 * @desc delete subgreddiit
 * @access Private
 * @returns {subgreddiit}
 */
router.delete('/delete/:id', auth, async (req, res) => {
  try {
    const subgreddiit = await Subgreddiit.findById(req.params.id);
    if (!subgreddiit) {
      return res.status(404).json({ errors: [{ msg: 'Subgreddiit not found' }] });
    }
    if (subgreddiit.moderatorId.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await Post.deleteMany({ subgreddiitId: req.params.id });
    await User.updateMany({ 'subgreddiits.subgreddiitId': req.params.id }, { $pull: { subgreddiits: { subgreddiitId: req.params.id } } });
    await Report.deleteMany({ subgreddiitId: req.params.id });
    await Comment.deleteMany({ subgreddiitId: req.params.id });

    // Delete subgreddiit
    await subgreddiit.remove();
    res.json({ errors: [{ msg: 'Subgreddiit removed' }] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

export default router;