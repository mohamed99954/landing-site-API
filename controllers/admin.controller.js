const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// ✅ تسجيل الدخول للأدمن
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود الحقول
    if (!email || !password) {
      return res.status(400).json({ error: '❌ البريد وكلمة المرور مطلوبة' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ error: '❌ البريد الإلكتروني غير صحيح' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: '❌ كلمة المرور غير صحيحة' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET غير موجود في .env');
      return res.status(500).json({ error: '⚠ خطأ في إعدادات السيرفر' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, message: '✅ تسجيل الدخول ناجح' });

  } catch (err) {
    console.error('❌ خطأ أثناء تسجيل الدخول:', err.message);
    res.status(500).json({ error: '❌ حدث خطأ في تسجيل الدخول' });
  }
};

// ✅ إنشاء أدمن جديد
exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من الحقول
    if (!email || !password) {
      return res.status(400).json({ error: '❌ البريد وكلمة المرور مطلوبة' });
    }

    const exists = await Admin.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ error: '⚠ هذا البريد مستخدم من قبل' });
    }

    const newAdmin = await Admin.create({
      email: email.toLowerCase(),
      password
    });

    res.status(201).json({
      message: '✅ تم إنشاء الأدمن بنجاح',
      admin: {
        id: newAdmin._id,
        email: newAdmin.email
      }
    });

  } catch (err) {
    console.error('❌ خطأ أثناء إنشاء الأدمن:', err.message);
    res.status(500).json({ error: '❌ فشل في إنشاء الأدمن' });
  }
};