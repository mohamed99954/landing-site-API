const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  images: [String],

  // 🔹 إضافات مفيدة مستقبلًا:
  category: { type: String },      // مثل: Residential, Commercial
  location: { type: String },      // مثل: Riyadh, Jeddah
  status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
  featured: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);