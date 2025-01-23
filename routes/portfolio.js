const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Home Page
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.render('index', { projects });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add a Project (Form)
router.get('/add', (req, res) => {
  res.render('add');
});

// Add a Project (Submission)
router.post('/add', async (req, res) => {
  const { title, description, image, url } = req.body;

  try {
    await Project.create({ title, description, image, url });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error saving project');
  }
});

module.exports = router;
