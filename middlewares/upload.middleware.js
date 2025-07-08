// middlewares/upload.middleware.js
const multer = require('multer');

// استخدام التخزين في الذاكرة
const storage = multer.memoryStorage();

// فلترة الصور فقط
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('الملف يجب أن يكون صورة فقط!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;