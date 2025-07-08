const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({
  logoText: { type: String },
  welcomeMessage: { type: String },
  aboutText: { type: String },
  terms: { type: String },
  privacyPolicy: { type: String },
  logoImage: { type: String },
  backgroundImage: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Landing', landingSchema);