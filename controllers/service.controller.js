const Service = require('../models/service.model');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier'); // نحتاج هذا لتحويل الـ buffer إلى stream

// وظيفة لرفع صورة واحدة باستخدام stream
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'services' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// إنشاء خدمة
exports.createService = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer))
      );
    }

    const newService = await Service.create({
      title,
      shortDescription,
      description,
      images,
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Error in createService:", err);
    res.status(500).json({ error: err.message });
  }
};

// جلب كل الخدمات
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// جلب خدمة واحدة
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تحديث خدمة
exports.updateService = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      images = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer))
      );
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        description,
        ...(images.length && { images }),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف خدمة
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};