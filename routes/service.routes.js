const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/service.controller');

// رفع صور متعددة للخدمة
router.post('/', upload.array('images'), controller.createService);
router.get('/', controller.getAllServices);
router.get('/:id', controller.getServiceById);
router.put('/:id', upload.array('images'), controller.updateService);
router.delete('/:id', controller.deleteService);

module.exports = router;