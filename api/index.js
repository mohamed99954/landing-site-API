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
    }
  } catch (err) {
    console.error('❌ خطأ أثناء إنشاء الأدمن:', err);
  }
};

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      await createDefaultAdmin();
      isConnected = true;
    } catch (err) {
      console.error('❌ فشل الاتصال بقاعدة البيانات:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  if (req.url === '/favicon.ico') {
    return res.status(204).end();
  }

  return app(req, res);
};