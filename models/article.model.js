const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);