const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');

// GET all blogs
router.get('/', blogController.getBlogs);

// GET a single blog by ID
router.get('/:id', blogController.getBlogById);

// POST a new blog
router.post('/', blogController.createBlog);

// PUT update a blog by ID
router.put('/:id', blogController.updateBlog);

// DELETE a blog by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
