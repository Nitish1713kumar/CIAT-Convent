import express from 'express';
const router = express.Router();
import News from '../models/News.js';

// ✅ Get all news articles
router.get('/', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ date: -1 });
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// ✅ Get a single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// ✅ Create a new news article
router.post('/', async (req, res) => {
  try {
    const { title, summary, content, author, status, featured } = req.body;
    const newArticle = new News({ title, summary, content, author, status, featured });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// ✅ Update a news article
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArticle) return res.status(404).json({ error: 'Article not found' });
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// ✅ Delete a news article
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);
    if (!deletedArticle) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;

