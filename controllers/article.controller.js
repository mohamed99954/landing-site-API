const Article = require('../models/article.model');
const cloudinary = require('../config/cloudinary');

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

exports.createArticle = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;

    const images = req.files?.length ? await uploadImagesToCloudinary(req.files) : [];

    const newArticle = await Article.create({
      title,
      shortDescription,
      description,
      images,
    });

    res.status(201).json(newArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;

    const images = req.files?.length ? await uploadImagesToCloudinary(req.files) : [];

    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        description,
        ...(images.length && { images }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Article not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};