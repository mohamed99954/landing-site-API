const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);