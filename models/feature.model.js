const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  icon: { type: String } // يمكن أن يكون رابط صورة أو اسم أيقونة
}, { timestamps: true });

module.exports = mongoose.model('Feature', featureSchema);