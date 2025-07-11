// routes/article.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/article.controller');
// const { verifyToken } = require('../middlewares/auth.middleware'); // (اختياري للحماية)

/**
 * @route   POST /api/articles
 * @desc    إنشاء مقال جديد مع صور
 * @access  Admin
 */
router.post('/', upload.array('images'), controller.createArticle);

/**
 * @route   GET /api/articles
 * @desc    جلب كل المقالات
 * @access  Public
 */
router.get('/', controller.getAllArticles);

/**
 * @route   GET /api/articles/:id
 * @desc    جلب مقال حسب ID
 * @access  Public
 */
router.get('/:id', controller.getArticleById);

/**
 * @route   PUT /api/articles/:id
 * @desc    تعديل مقال + صور جديدة
 * @access  Admin
 */
router.put('/:id', upload.array('images'), controller.updateArticle);

/**
 * @route   DELETE /api/articles/:id
 * @desc    حذف مقال
 * @access  Admin
 */
router.delete('/:id', controller.deleteArticle);

module.exports = router;