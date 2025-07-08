const Project = require('../models/project.model');
const cloudinary = require('../config/cloudinary');

// دالة رفع صور متعددة إلى Cloudinary
const uploadImagesToCloudinary = async (files, folder = 'projects') => {
  const uploads = files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder }, (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }).end(file.buffer);
    });
  });
  return Promise.all(uploads);
};

exports.createProject = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    const images = req.files?.length ? await uploadImagesToCloudinary(req.files) : [];

    const newProject = await Project.create({
      title,
      shortDescription,
      description,
      images,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error('❌ Error in createProject:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    const images = req.files?.length ? await uploadImagesToCloudinary(req.files) : [];

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        description,
        ...(images.length && { images }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};