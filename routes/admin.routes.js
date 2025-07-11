const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/admin/login
 * @desc    تسجيل دخول الأدمن
 * @access  Public
 */
router.post('/login', adminController.loginAdmin);

/**
 * @route   POST /api/admin/create
 * @desc    إنشاء أدمن جديد (يفضل حمايتها لاحقًا)
 * @access  Protected (اختياري)
 */
router.post('/create', verifyToken, adminController.createAdmin);

module.exports = router;