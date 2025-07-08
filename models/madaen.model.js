// models/city.model.js
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);