const app = require('./app');
const connectDB = require('./config/db');
const Admin = require('./models/admin.model');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// ✅ إنشاء الأدمن المؤقت إذا لم يكن موجودًا
const createDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL;
    const password = process.env.ADMIN_DEFAULT_PASSWORD;

    if (!email || !password) {
      console.log('ℹ لم يتم ضبط بيانات الأدمن المؤقت في .env');
      return;
    }

    const exists = await Admin.findOne({ email });
    if (!exists) {
      await Admin.create({ email, password });
      console.log('✅ تم إنشاء الأدمن المؤقت بنجاح');
    } else {
      console.log('ℹ الأدمن المؤقت موجود مسبقًا');
    }
  } catch (err) {
    console.error('❌ فشل في إنشاء الأدمن المؤقت:', err);
  }
};

// ✅ تشغيل السيرفر بعد الاتصال بقاعدة البيانات
const startServer = async () => {
  await connectDB();
  await createDefaultAdmin(); // ← هنا يتم إنشاء الأدمن المؤقت

  app.listen(PORT, () => {
    console.log(🚀 Server running on http://localhost:${PORT});
  });
};

startServer();