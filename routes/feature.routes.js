const express = require('express');
const router = express.Router();
const controller = require('../controllers/feature.controller');

// CRUD Routes
router.post('/', controller.createFeature);
router.get('/', controller.getAllFeatures);
router.get('/:id', controller.getFeatureById);
router.put('/:id', controller.updateFeature);
router.delete('/:id', controller.deleteFeature);

module.exports = router;