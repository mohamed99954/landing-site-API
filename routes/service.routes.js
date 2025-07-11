// routes/service.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/service.controller');

/**
 * @route   POST /api/services
 * @desc    إنشاء خدمة جديدة مع صور
 * @access  Admin
 */
router.post('/', upload.array('images'), controller.createService);

/**
 * @route   GET /api/services
 * @desc    جلب جميع الخدمات
 * @access  Public
 */
router.get('/', controller.getAllServices);

/**
 * @route   GET /api/services/:id
 * @desc    جلب خدمة واحدة حسب المعرف
 * @access  Public
 */
router.get('/:id', controller.getServiceById);

/**
 * @route   PUT /api/services/:id
 * @desc    تعديل خدمة مع صور جديدة
 * @access  Admin
 */
router.put('/:id', upload.array('images'), controller.updateService);

/**
 * @route   DELETE /api/services/:id
 * @desc    حذف خدمة
 * @access  Admin
 */
router.delete('/:id', controller.deleteService);

module.exports = router;