const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');

// إرسال رسالة تواصل
router.post('/', controller.sendContact);

// عرض كل الرسائل (ممكن حمايته لاحقًا بـ JWT)
router.get('/', controller.getAllContacts);

module.exports = router;