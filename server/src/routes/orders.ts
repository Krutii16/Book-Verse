import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);

router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

import Book from '../models/Book';

router.post('/', async (req, res) => {
  try {
    const { items } = req.body; 
    // items = [{ bookId, quantity }]

    for (const item of items) {
      const book = await Book.findById(item.bookId);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (book.quantity < item.quantity) {
        return res.status(400).json({ error: 'Not enough stock' });
      }

      //Reduce stock
      book.quantity -= item.quantity;

      //Update stock status
      if (book.quantity === 0) {
        book.inStock = false;
      }

      await book.save();
    }

    res.json({ message: 'Order placed successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Order failed' });
  }
});
export default router;
