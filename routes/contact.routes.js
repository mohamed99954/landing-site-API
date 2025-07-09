const express = require('express');
const router = express.Router();

// تأكد من أن المسار صحيح 100%
const controller = require('../controllers/contact.controller');

// تحقق أن sendContact و getAllContacts موجودتان فعلاً
if (typeof controller.sendContact !== 'function') {
  console.error('❌ sendContact is not a function or is undefined');
}

if (typeof controller.getAllContacts !== 'function') {
  console.error('❌ getAllContacts is not a function or is undefined');
}

// إرسال رسالة تواصل
router.post('/', (req, res, next) => {
  if (typeof controller.sendContact === 'function') {
    return controller.sendContact(req, res, next);
  }
  res.status(500).send('sendContact function is not available.');
});

// عرض كل الرسائل
router.get('/', (req, res, next) => {
  if (typeof controller.getAllContacts === 'function') {
    return controller.getAllContacts(req, res, next);
  }
  res.status(500).send('getAllContacts function is not available.');
});

module.exports = router;