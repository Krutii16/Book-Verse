import { Request, Response } from 'express';
import CartItem from '../models/CartItem';
import Book from '../models/Book';

export const getCart = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find({ userId: req.userId });
    
    let totalPrice = 0;
    const items = [];

    for (const item of cartItems) {
      const book = await Book.findById(item.bookId);
      if (book) {
        const itemTotal = book.price * item.quantity;
        totalPrice += itemTotal;
        items.push({
          _id: item._id,
          book,
          quantity: item.quantity,
          itemTotal
        });
      }
    }

    res.json({ items, totalPrice, itemCount: items.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { bookId, quantity } = req.body;
    
    if (!bookId || !quantity) {
      return res.status(400).json({ error: 'Book ID and quantity required' });
    }

    const existingItem = await CartItem.findOne({ 
      userId: req.userId, 
      bookId 
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const cartItem = new CartItem({
        userId: req.userId,
        bookId,
        quantity
      });
      await cartItem.save();
    }

    res.json({ message: 'Item added to cart' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity required' });
    }

    const item = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json({ message: 'Cart item updated', item });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    await CartItem.deleteMany({ userId: req.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
