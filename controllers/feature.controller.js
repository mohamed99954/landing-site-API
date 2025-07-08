const Feature = require('../models/feature.model');

exports.createFeature = async (req, res) => {
  try {
    const { title, subtitle, icon } = req.body;
    const feature = await Feature.create({ title, subtitle, icon });
    res.status(201).json(feature);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json(features);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) return res.status(404).json({ message: 'Feature not found' });
    res.json(feature);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const { title, subtitle, icon } = req.body;
    const updated = await Feature.findByIdAndUpdate(
      req.params.id,
      { title, subtitle, icon },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Feature not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const deleted = await Feature.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Feature not found' });
    res.json({ message: 'Feature deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};