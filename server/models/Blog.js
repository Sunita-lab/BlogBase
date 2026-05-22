const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,    // ye field zaroori hai
      trim: true         // spaces hata dega start/end se
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],    // strings ki array
      default: []        // default empty array
    },
    published: {
      type: Boolean,
      default: false     // default draft mode mein hoga
    }
  },
  {
    timestamps: true     // createdAt aur updatedAt automatically add hoga
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;