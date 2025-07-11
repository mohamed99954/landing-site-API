// api/index.js

const app = require('../app');
const connectDB = require('../config/db');
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');

let isConnected = false;

// ✅ إنشاء أدمن افتراضي إن لم يكن موجودًا
const createDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL;
    const password = process.env.ADMIN_DEFAULT_PASSWORD;

    if (!email || !password) {
      console.log('ℹ بيانات الأدمن المؤقت غير مكتملة في .env');
      return;
    }

    const exists = await Admin.findOne({ email });

    if (!exists) {
      const hashedPassword = await bcrypt.hash(password, 12);

      await Admin.create({ email, password: hashedPassword });

      console.log('✅ تم إنشاء الأدمن الافتراضي بنجاح');
    } else {
      console.log('ℹ الأدمن الافتراضي موجود مسبقًا');
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

      // إنشاء الأدمن الافتراضي بعد الاتصال
      await createDefaultAdmin();
    } catch (err) {
      console.error('❌ فشل الاتصال بقاعدة البيانات:', err.message);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  // تجاهل favicon.ico
  if (req.url === '/favicon.ico') {
    return res.status(204).end();
  }

  return app(req, res);
};