// config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // طباعة الرابط المستخدم للاتصال (اختياري لأغراض التصحيح)
    console.log('🔍 MongoDB URI:', process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // ينهي التطبيق في حال فشل الاتصال
  }
};

module.exports = connectDB;