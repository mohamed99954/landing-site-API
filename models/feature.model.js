const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String } // رابط صورة أو أيقونة
}, { timestamps: true });

module.exports = mongoose.model('Feature', featureSchema);