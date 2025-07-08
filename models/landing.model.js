const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({
  logoText: { type: String },
  welcomeMessage: { type: String },
  aboutText: { type: String },
  terms: { type: String },
  privacyPolicy: { type: String },
  logoImage: { type: String },
  backgroundImage: { type: String },

  // ✅ صور الـ Hero Section
  hero1: { type: String },
  hero2: { type: String },
  hero3: { type: String },
  hero4: { type: String },
  hero5: { type: String },

  // ✅ صور قسم About
  about1: { type: String },
  about2: { type: String },

  // ✅ روابط التواصل الاجتماعي
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    tiktok: { type: String }
  },
}, { timestamps: true });

module.exports = mongoose.model('Landing', landingSchema);