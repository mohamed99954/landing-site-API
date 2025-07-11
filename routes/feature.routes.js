const express = require('express');
const router = express.Router();
const controller = require('../controllers/feature.controller');

/**
 * @route   GET /api/features
 * @desc    Get all features
 */
router.get('/', controller.getAllFeatures);

/**
 * @route   POST /api/features
 * @desc    Create a new feature
 */
router.post('/', controller.createFeature);

/**
 * @route   PUT /api/features/:id
 * @desc    Update a feature
 */
router.put('/:id', controller.updateFeature);

/**
 * @route   DELETE /api/features/:id
 * @desc    Delete a feature
 */
router.delete('/:id', controller.deleteFeature);

module.exports = router;