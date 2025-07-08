const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    const images = req.files?.map(file => file.path) || [];

    const newProject = await Project.create({ title, shortDescription, description, images });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const { title, shortDescription, description } = req.body;
  const images = req.files?.map(file => file.path) || [];

  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    { title, shortDescription, description, ...(images.length && { images }) },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Project not found' });
  res.json(updated);
};

exports.deleteProject = async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
};