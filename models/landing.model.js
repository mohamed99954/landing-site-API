const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({
  logoText: { type: String },
  welcomeMessage: { type: String },
  aboutText: { type: String },
  terms: { type: String },
  privacyPolicy: { type: String },

  // ✅ الصور
  logoImage: { type: String },
  backgroundImage: { type: String },
  hero1: { type: String },
  hero2: { type: String },
  hero3: { type: String },
  hero4: { type: String },
  hero5: { type: String },
  about1: { type: String },
  about2: { type: String },

  // ✅ روابط التواصل
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    tiktok: { type: String }
  },

  // ✅ معلومات التواصل
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    address: { type: String }
  },

  // ✅ عناوين الأقسام
  sectionTitles: {
    servicesTitle: { type: String },
    projectsTitle: { type: String },
    blogTitle: { type: String }
  },

  // ✅ دعوة لاتخاذ إجراء (Call to Action)
  mainCTA: {
    title: { type: String },
    buttonText: { type: String },
    link: { type: String }
  }

}, { timestamps: true });

module.exports = mongoose.model('Landing', landingSchema);