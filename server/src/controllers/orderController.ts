import { Request, Response } from 'express';
import Order from '../models/Order';
import CartItem from '../models/CartItem';
import Book from '../models/Book';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    if (!shippingAddress) {
      return res.status(400).json({ error: 'Shipping address required' });
    }

    const cartItems = await CartItem.find({ userId: req.userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalPrice = 0;
    const books = [];

    for (const item of cartItems) {
      const book = await Book.findById(item.bookId);
      if (book) {
        totalPrice += book.price * item.quantity;
        books.push({
          bookId: item.bookId,
          quantity: item.quantity,
          price: book.price
        });
      }
    }

    const order = new Order({
      userId: req.userId,
      books,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      status: 'pending'
    });

    await order.save();
    await CartItem.deleteMany({ userId: req.userId });

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    if (order.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json({ order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: 'Order updated', order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
