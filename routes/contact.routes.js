const Feature = require('../models/feature.model');

// ✅ Get all features
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create a new feature
exports.createFeature = async (req, res) => {
  try {
    const feature = await Feature.create(req.body);
    res.status(201).json(feature);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update an existing feature
exports.updateFeature = async (req, res) => {
  try {
    const updated = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a feature
exports.deleteFeature = async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feature deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};