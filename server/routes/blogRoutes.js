const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// 1. CREATE — naya blog banao
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. READ ALL — saare blogs lao
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. READ ONE — ek blog lao ID se
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog nahi mila' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE — blog edit karo
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // updated document return karo
    );
    if (!blog) return res.status(404).json({ error: 'Blog nahi mila' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE — blog hatao
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog nahi mila' });
    res.json({ message: 'Blog delete ho gaya ✅' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;