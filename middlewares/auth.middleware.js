// middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // تحقق من وجود التوكن
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '❌ التوكن غير موجود أو غير صالح' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // حفظ بيانات الأدمن المستخرجة من التوكن
    next();
  } catch (err) {
    return res.status(401).json({ error: '❌ التوكن غير صالح أو منتهي' });
  }
};

module.exports = { verifyToken };