// api/admin/login.js

const connectDB = require('../../../config/db');
const Admin = require('../../../models/admin.model');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'الطريقة غير مدعومة' });
    }

    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'الرجاء إدخال البريد وكلمة السر' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
    }

    return res.status(200).json({ message: 'تم تسجيل الدخول بنجاح ✅' });

  } catch (err) {
    console.error('❌ خطأ في تسجيل الدخول:', err);
    return res.status(500).json({ error: 'خطأ في السيرفر' });
  }
};