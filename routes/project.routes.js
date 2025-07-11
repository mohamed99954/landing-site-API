// routes/project.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/project.controller');
// const { verifyToken } = require('../middlewares/auth.middleware'); // ← اختياري للحماية لاحقًا

/**
 * @route   POST /api/projects
 * @desc    إنشاء مشروع جديد مع صور
 * @access  Admin
 */
router.post('/', upload.array('images'), controller.createProject);

/**
 * @route   GET /api/projects
 * @desc    جلب جميع المشاريع
 * @access  Public
 */
router.get('/', controller.getAllProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    جلب مشروع حسب المعرف
 * @access  Public
 */
router.get('/:id', controller.getProjectById);

/**
 * @route   PUT /api/projects/:id
 * @desc    تعديل مشروع مع صور جديدة
 * @access  Admin
 */
router.put('/:id', upload.array('images'), controller.updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    حذف مشروع
 * @access  Admin
 */
router.delete('/:id', controller.deleteProject);

module.exports = router;