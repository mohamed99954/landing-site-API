const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// ✅ تسجيل دخول الأدمن
router.post('/login', adminController.loginAdmin);

// ✅ إنشاء أدمن جديد (يمكن حذفه بعد الإنشاء الأولي)
router.post('/create', adminController.createAdmin);

module.exports = router;