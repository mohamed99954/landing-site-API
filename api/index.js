// api/index.js

const app = require('../app');
const connectDB = require('../config/db');
const Admin = require('../models/admin.model');

let isConnected = false;

const createDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL;
    const password = process.env.ADMIN_DEFAULT_PASSWORD;

    if (!email || !password) {
      console.log('ℹ بيانات الأدمن المؤقت غير مكتملة');
      return;
    }

    const exists = await Admin.findOne({ email });
    if (!exists) {
      await Admin.create({ email, password });
      console.log('✅ تم إنشاء الأدمن المؤقت (Vercel)');
    } else {
      console.log('ℹ الأدمن المؤقت موجود مسبقًا');
    }
  } catch (err) {
    console.error('❌ خطأ أثناء إنشاء الأدمن:', err.message);
  }
};

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      console.log('✅ الاتصال بقاعدة البيانات تم بنجاح');
      isConnected = true;

      // فقط بعد الاتصال نقوم بإنشاء الأدمن
      await createDefaultAdmin();
    } catch (err) {
      console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  if (req.url === '/favicon.ico') {
    return res.status(204).end();
  }

  return app(req, res);
};