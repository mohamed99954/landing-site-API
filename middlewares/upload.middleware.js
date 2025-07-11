const multer = require('multer');
const path = require('path');

// ✅ أنواع الصور المسموحة
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ✅ إعداد التخزين الفعلي في مجلد uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // تأكد أن المجلد موجود
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

// ✅ فلترة الملفات — فقط الصور
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('❌ الملف يجب أن يكون صورة بصيغة png أو jpg أو webp فقط'), false);
  }
};

// ✅ تحديد حجم الملف (5MB كحد أقصى)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 ميجابايت
};

// ✅ إنشاء إعدادات multer
const upload = multer({ storage, fileFilter, limits });

module.exports = upload;