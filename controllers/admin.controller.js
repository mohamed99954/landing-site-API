const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// ✅ تسجيل الدخول للأدمن
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن الأدمن في قاعدة البيانات
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: '❌ البريد الإلكتروني غير صحيح' });
    }

    // التحقق من كلمة المرور
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: '❌ كلمة المرور غير صحيحة' });
    }

    // التحقق من توفر JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET مفقود في متغيرات البيئة (.env)');
      return res.status(500).json({ error: '⚠ خطأ في إعدادات السيرفر' });
    }

    // إنشاء رمز JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, message: '✅ تسجيل الدخول ناجح' });

  } catch (err) {
    console.error('❌ خطأ أثناء تسجيل الدخول:', err);
    res.status(500).json({ error: '❌ حدث خطأ في تسجيل الدخول' });
  }
};

// ✅ إنشاء أدمن جديد (يدويًا)
exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود المستخدم مسبقًا
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: '⚠ المستخدم موجود بالفعل' });
    }

    // إنشاء أدمن جديد
    const newAdmin = await Admin.create({ email, password });

    res.status(201).json({
      message: '✅ تم إنشاء الأدمن بنجاح',
      admin: {
        id: newAdmin._id,
        email: newAdmin.email
      }
    });
  } catch (err) {
    console.error('❌ خطأ أثناء إنشاء الأدمن:', err);
    res.status(500).json({ error: '❌ فشل في إنشاء الأدمن' });
  }
};