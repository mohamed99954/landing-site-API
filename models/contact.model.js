const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },

  // 🟡 إضافات اختيارية مستقبلية:
  phone: { type: String },
  status: {
    type: String,
    enum: ['new', 'replied', 'archived'],
    default: 'new'
  },
  read: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);