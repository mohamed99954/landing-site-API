// controllers/admin.controller.js

const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'البريد الإلكتروني غير صحيح' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'كلمة المرور غير صحيحة' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, message: '✅ تسجيل الدخول ناجح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ حدث خطأ في تسجيل الدخول' });
  }
};

// (اختياري) إنشاء أدمن جديد - مؤقتًا فقط
exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: 'المستخدم موجود بالفعل' });

    const newAdmin = await Admin.create({ email, password });
    res.status(201).json({ message: '✅ تم إنشاء الأدمن بنجاح', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ فشل في إنشاء الأدمن' });
  }
};