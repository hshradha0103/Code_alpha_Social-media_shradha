const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { content, author } = req.body;
    const newPost = new Post({ content, author });
    await newPost.save();
    res.status(201).send('Post created');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
