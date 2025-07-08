const express = require('express');
const router = express.Router();

// استخدم الميدل وير الجاهز اللي فيه memoryStorage
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/landing.controller');

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