const Service = require('../models/service.model');

// إنشاء خدمة
exports.createService = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    const images = req.files?.map(file => file.path) || [];

    const newService = await Service.create({ title, shortDescription, description, images });
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب كل الخدمات
exports.getAllServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

// جلب خدمة واحدة
exports.getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

// تحديث خدمة
exports.updateService = async (req, res) => {
  const { title, shortDescription, description } = req.body;
  const images = req.files?.map(file => file.path) || [];

  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    { title, shortDescription, description, ...(images.length && { images }) },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Service not found' });
  res.json(updated);
};

// حذف خدمة
exports.deleteService = async (req, res) => {
  const deleted = await Service.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service deleted' });
};