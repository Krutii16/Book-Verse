import express from 'express';
import Category from '../models/category';
const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// ADD
router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name required' });
  }

  const category = new Category({ name: req.body.name });
  await category.save();

  res.json(category);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;