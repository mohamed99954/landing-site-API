const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // طباعة الرابط المستخدم للاتصال (مؤقتًا للتأكد من قراءة متغير البيئة)
    console.log('🔍 MongoDB URI:', process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // ينهي التطبيق إذا فشل الاتصال
  }
};

module.exports = connectDB;