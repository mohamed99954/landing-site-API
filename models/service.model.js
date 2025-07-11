const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الخدمة مطلوب'],
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: []
  },

  // ✳ إضافات اختيارية مستقبلًا:
  category: { type: String }, // مثل: تصميم، بناء، تشطيب
  isActive: { type: Boolean, default: true }, // لإخفاء الخدمة دون حذفها
  order: { type: Number, default: 0 } // للترتيب اليدوي

}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);