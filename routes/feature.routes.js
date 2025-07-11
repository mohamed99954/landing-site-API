const express = require('express');
const router = express.Router();
const controller = require('../controllers/feature.controller');
const upload = require('../middlewares/upload.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');

/**
 * @route   GET /api/features
 * @desc    Get all features
 * @access  Protected
 */
router.get('/', verifyToken, controller.getAllFeatures);

/**
 * @route   POST /api/features
 * @desc    Create a new feature (with image upload)
 * @access  Protected
 */
router.post('/', verifyToken, upload.single('icon'), controller.createFeature);

/**
 * @route   PUT /api/features/:id
 * @desc    Update a feature (with optional image upload)
 * @access  Protected
 */
router.put('/:id', verifyToken, upload.single('icon'), controller.updateFeature);

/**
 * @route   DELETE /api/features/:id
 * @desc    Delete a feature
 * @access  Protected
 */
router.delete('/:id', verifyToken, controller.deleteFeature);

module.exports = router;