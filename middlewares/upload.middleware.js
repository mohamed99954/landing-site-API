const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ تأكد من أن مجلد uploads موجود
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ أنواع الصور المسموحة
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ✅ إعداد التخزين الفعلي في مجلد uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // مجلد التخزين
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

// ✅ فلترة الملفات — فقط الصور المسموحة
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('❌ الملف المرفوع يجب أن يكون صورة بصيغة png أو jpg أو webp فقط'), false);
  }
};

// ✅ تحديد حجم الملف (5MB كحد أقصى)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 ميجابايت
};

// ✅ إعداد Multer النهائي
const upload = multer({ storage, fileFilter, limits });

// 📤 دعم رفع صورة واحدة من الحقل image أو icon
exports.uploadSingleImage = (fieldName = 'image') => upload.single(fieldName);

// 📤 دعم رفع عدة ملفات لاحقًا إذا احتجت
// exports.uploadMultiple = upload.array('images', 5);

module.exports = upload;