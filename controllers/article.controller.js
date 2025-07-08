const Article = require('../models/article.model');

exports.createArticle = async (req, res) => {
  try {
    const { title, shortDescription, description } = req.body;
    const images = req.files?.map(file => file.path) || [];

    const newArticle = await Article.create({ title, shortDescription, description, images });
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
};

exports.getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
};

exports.updateArticle = async (req, res) => {
  const { title, shortDescription, description } = req.body;
  const images = req.files?.map(file => file.path) || [];

  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    { title, shortDescription, description, ...(images.length && { images }) },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Article not found' });
  res.json(updated);
};

exports.deleteArticle = async (req, res) => {
  const deleted = await Article.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Article not found' });
  res.json({ message: 'Article deleted' });
};