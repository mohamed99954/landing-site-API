// api/admin/login.js

const connectDB = require('../../../config/db');
const Admin = require('../../../models/admin.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: '❌ الطريقة غير مدعومة' });
    }

    await connectDB();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: '❌ البريد وكلمة المرور مطلوبة' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: '❌ البريد الإلكتروني غير صحيح' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: '❌ كلمة المرور غير صحيحة' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: '❌ إعدادات السيرفر غير مكتملة (JWT)' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: '✅ تم تسجيل الدخول بنجاح',
      token
    });

  } catch (err) {
    console.error('❌ خطأ في تسجيل الدخول:', err.message);
    return res.status(500).json({ error: '❌ خطأ في السيرفر' });
  }
};