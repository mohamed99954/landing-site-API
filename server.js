// تحميل التطبيق وملف الاتصال بقاعدة البيانات
const app = require('./app');
const connectDB = require('./config/db');
const Admin = require('./models/admin.model');
require('dotenv').config();

// تحديد المنفذ من .env أو 5000 كخيار افتراضي
const PORT = process.env.PORT || 5000;

// ✅ دالة: إنشاء حساب أدمن مؤقت تلقائيًا إذا لم يكن موجودًا
const createDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL;
    const password = process.env.ADMIN_DEFAULT_PASSWORD;

    // التحقق من وجود البيانات في .env
    if (!email || !password) {
      console.log('ℹ لم يتم ضبط بيانات الأدمن المؤقت في .env');
      return;
    }

    // التحقق من وجود الحساب في قاعدة البيانات
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

// ✅ تشغيل التطبيق بعد الاتصال بقاعدة البيانات وإنشاء الأدمن المؤقت
const startServer = async () => {
  await connectDB();            // الاتصال بقاعدة البيانات
  await createDefaultAdmin();   // إنشاء الأدمن المؤقت

  app.listen(PORT, () => {
    console.log(🚀 Server running on http://localhost:${PORT});
  });
};

// بدء تشغيل التطبيق
startServer();