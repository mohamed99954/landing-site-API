const Article = require('../models/article.model');
const cloudinary = require('../config/cloudinary');

// 🔽 رفع الصور إلى Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const uploads = files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'articles' },
        (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        }
      ).end(file.buffer);
    });
  });

  return Promise.all(uploads);
};

// ✅ إنشاء مقال جديد
exports.createArticle = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;

    const images = Array.isArray(req.files) && req.files.length
      ? await uploadImagesToCloudinary(req.files)
      : [];

    const newArticle = await Article.create({
      title,
      shortDescription,
      description,
      images,
    });

    res.status(201).json(newArticle);
  } catch (err) {
    console.error('❌ Error creating article:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ جلب جميع المقالات
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ جلب مقال واحد بالمعرّف
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ تحديث مقال
exports.updateArticle = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;

    let images = [];

    // دعم upload.array() أو upload.fields()
    if (Array.isArray(req.files) && req.files.length) {
      images = await uploadImagesToCloudinary(req.files);
    }

    const updateData = {
      ...(title && { title }),
      ...(shortDescription && { shortDescription }),
      ...(description && { description }),
      ...(images.length && { images })
    };

    const updated = await Article.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Article not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ حذف مقال
exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: '✅ Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};