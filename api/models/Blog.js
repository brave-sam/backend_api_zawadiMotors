const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

  title: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String, required: false },
  author: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
