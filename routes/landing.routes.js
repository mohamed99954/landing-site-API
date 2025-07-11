const express = require('express');
const router = express.Router();

const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/landing.controller');

/**
 * @route   GET /api/landing
 * @desc    Get landing page content
 * @access  Public
 */
router.get('/', controller.getLanding);

/**
 * @route   PUT /api/landing
 * @desc    Update landing page content and images
 * @access  Admin
 */
router.put(
  '/',
  upload.fields([
    { name: 'logoImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'hero1', maxCount: 1 },
    { name: 'hero2', maxCount: 1 },
    { name: 'hero3', maxCount: 1 },
    { name: 'hero4', maxCount: 1 },
    { name: 'hero5', maxCount: 1 },
    { name: 'about1', maxCount: 1 },
    { name: 'about2', maxCount: 1 },
  ]),
  controller.updateLanding
);

module.exports = router;