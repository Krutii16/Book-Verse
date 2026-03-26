import express from 'express';
import Book from '../models/Book';
import User from '../models/User';
import Order from '../models/Order';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    res.json({
      books: totalBooks,
      users: totalUsers,
      orders: totalOrders,
      revenue: totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});
// ✅ GET ALL BOOKS
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});


// ✅ ADD BOOK
router.post('/books', async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error adding book' });
  }
});


// ✅ UPDATE BOOK
router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
});


// ✅ DELETE BOOK
router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting book' });
  }
});

export default router;