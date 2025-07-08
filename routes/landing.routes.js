const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/landing.controller');

// إعداد Multer لحقول محددة
const upload = multer({ dest: 'uploads/' });

router.get('/', controller.getLanding);
router.put(
  '/',
  upload.fields([
    { name: 'logoImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
  ]),
  controller.updateLanding
);

module.exports = router;