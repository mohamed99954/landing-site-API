// models/admin.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // ✅ تغيير هنا

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// تشفير كلمة المرور قبل الحفظ
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12); // ✅ لا حاجة لتغيير الدالة
  next();
});

// دالة للمقارنة بين كلمة المرور المدخلة والمشفرة
adminSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password); // ✅ نفس الطريقة
};

module.exports = mongoose.model('Admin', adminSchema);