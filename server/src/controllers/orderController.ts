import { Request, Response } from 'express';
import Order from '../models/Order';
import CartItem from '../models/CartItem';
import Book from '../models/Book';
import User from '../models/User';
import router from '../routes/admin';
import { authMiddleware } from '../middleware/auth';
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
    const orders = await Order.find({ userId: req.userId }).populate('books.bookId').sort({ createdAt: -1 });

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
    const updatedOrders = await Promise.all(
      orders.map(async (order: any) => {

        //  get user email
        const user = await User.findById(order.userId);

        //  get book titles
        const booksWithDetails = await Promise.all(
          order.books.map(async (item: any) => {
            const book = await Book.findById(item.bookId);

            return {
              title: book?.title,
              quantity: item.quantity,
              price: item.price
            };
          })
        );

        return {
          ...order.toObject(),
          userEmail: user?.email,
          books: booksWithDetails
        };
      })
    );

    res.json({ orders: updatedOrders });

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
router.put('/orders/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order: updatedOrder });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
export const getMyOrders = async (req: any, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    const orders = await Order.find({ userId })
    .populate('books.bookId') 
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders }); 
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const deleteOrder = async (req: any, res: any) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Order.findByIdAndDelete(req.params.id);

    return res.json({ message: "Order deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};