// middlewares/upload.middleware.js

const multer = require('multer');

// ✅ إعداد التخزين المؤقت في الذاكرة (بدون ملفات مؤقتة على القرص)
const storage = multer.memoryStorage();

// ✅ فلترة الملفات — فقط صور
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('❌ الملف يجب أن يكون صورة (jpeg, png, webp...)'), false);
  }
};

// ✅ تحديد حجم الملف (مثال: 5MB)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// ✅ تفعيل multer مع الإعدادات
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;