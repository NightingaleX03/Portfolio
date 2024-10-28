// /server/routes/projects.js

const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel'); // Importing project model
const projectController = require('../controllers/projectController');

// GET all projects
router.get('/', projectController.getAllProjects);

// POST a new project
router.post('/', projectController.createProject);

// Export the router
module.exports = router;
