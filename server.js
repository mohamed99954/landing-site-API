require('dotenv').config(); // تحميل متغيرات البيئة
const app = require('./app'); // ملف Express
const connectDB = require('./config/db.js'); // الاتصال بقاعدة البيانات

const PORT = process.env.PORT || 5000;

// دالة async لتشغيل الخادم بعد الاتصال
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1); // خروج فوري في حال فشل الاتصال
  }
})();