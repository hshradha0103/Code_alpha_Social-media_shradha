const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

const router = express.Router();

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { content, author, post } = req.body;
    const newComment = new Comment({ content, author, post });
    await newComment.save();

    // Add comment to the post
    const postDoc = await Post.findById(post);
    postDoc.comments.push(newComment._id);
    await postDoc.save();

    res.status(201).send('Comment created');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
