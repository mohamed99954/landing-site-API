const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');

// POST: إرسال رسالة تواصل
router.post('/', controller.sendContact);

// GET: جلب جميع الرسائل (اختياري - لوحة الإدارة)
router.get('/', controller.getAllContacts);

module.exports = router;