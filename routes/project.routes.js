const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const controller = require('../controllers/project.controller');

router.post('/', upload.array('images'), controller.createProject);
router.get('/', controller.getAllProjects);
router.get('/:id', controller.getProjectById);
router.put('/:id', upload.array('images'), controller.updateProject);
router.delete('/:id', controller.deleteProject);

module.exports = router;