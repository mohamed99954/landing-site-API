const jwt = require('jsonwebtoken');

// ✅ Middleware لحماية المسارات باستخدام JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔹 التحقق من وجود التوكن بصيغة Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '❌ Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 🔹 فك التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 حفظ بيانات المستخدم (مثلاً: ID أو email)
    req.admin = decoded;

    next();
  } catch (err) {
    console.error('❌ JWT verification failed:', err.message);
    return res.status(401).json({ error: '❌ Invalid or expired token.' });
  }
};

module.exports = { verifyToken };