const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/article.controller');

router.post('/', upload.array('images'), controller.createArticle);
router.get('/', controller.getAllArticles);
router.get('/:id', controller.getArticleById);
router.put('/:id', upload.array('images'), controller.updateArticle);
router.delete('/:id', controller.deleteArticle);

module.exports = router;