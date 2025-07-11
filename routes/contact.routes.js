const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact.controller');

// ✅ إنشاء رسالة تواصل
router.post('/', controller.createContact);

// ✅ جلب جميع رسائل التواصل
router.get('/', controller.getAllContacts);

// ✅ حذف رسالة تواصل واحدة
router.delete('/:id', controller.deleteContact);

module.exports = router;