const Feature = require('../models/feature.model');

// ✅ إنشاء ميزة جديدة
exports.createFeature = async (req, res) => {
  try {
    console.log('📥 req.body:', req.body);
    console.log('📸 req.file:', req.file);

    const { title, subtitle } = req.body;
    const icon = req.file?.filename ?? null;

    if (!title?.trim() || !icon) {
      return res.status(400).json({ error: '❌ العنوان والأيقونة مطلوبة' });
    }

    const feature = await Feature.create({ title, subtitle, icon });
    res.status(201).json(feature);
  } catch (err) {
    console.error('❌ فشل في إنشاء الميزة:', err.message);
    res.status(500).json({ error: 'فشل في إنشاء الميزة' });
  }
};

// ✅ جلب جميع الميزات
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.json(features);
  } catch (err) {
    console.error('❌ فشل في جلب الميزات:', err.message);
    res.status(500).json({ error: 'فشل في جلب الميزات' });
  }
};

// ✅ جلب ميزة واحدة بالمعرّف
exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ error: '❌ الميزة غير موجودة' });
    }
    res.json(feature);
  } catch (err) {
    console.error('❌ فشل في جلب الميزة:', err.message);
    res.status(500).json({ error: 'فشل في جلب الميزة' });
  }
};

// ✅ تحديث ميزة
exports.updateFeature = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const icon = req.file?.filename;

    const updateData = {};
    if (title) updateData.title = title;
    if (subtitle) updateData.subtitle = subtitle;
    if (icon) updateData.icon = icon;

    const updated = await Feature.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: '❌ الميزة غير موجودة' });
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ فشل في تحديث الميزة:', err.message);
    res.status(500).json({ error: 'فشل في تحديث الميزة' });
  }
};

// ✅ حذف ميزة
exports.deleteFeature = async (req, res) => {
  try {
    const deleted = await Feature.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: '❌ الميزة غير موجودة' });
    }
    res.json({ message: '✅ تم حذف الميزة بنجاح' });
  } catch (err) {
    console.error('❌ فشل في حذف الميزة:', err.message);
    res.status(500).json({ error: 'فشل في حذف الميزة' });
  }
};