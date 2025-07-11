const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  images: [String],

  // 🔹 إضافات مستقبلية مفيدة:
  category: { type: String },                // مثل: Architecture, Engineering, Safety
  tags: [String],                            // مثل: ['modern', 'villa', '2024']
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  featured: { type: Boolean, default: false }, // لتمييز المقالات المميزة

}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);