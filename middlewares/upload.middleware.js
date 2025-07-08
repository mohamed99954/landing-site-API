const multer = require('multer');
const path = require('path');

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// فلترة أنواع الملفات (صور فقط)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('الملف يجب أن يكون صورة فقط!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;