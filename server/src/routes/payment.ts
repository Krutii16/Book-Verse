import Razorpay from "razorpay";
import express from "express";
import crypto from "crypto";
import Order from "../models/Order";
import CartItem from "../models/CartItem";
const router = express.Router();

// 🔐 Razorpay instance
const razorpay = new Razorpay({
  key_id: "rzp_test_SbOqXCtvFC0WnH",
  key_secret: "KpEMGoNwZ3lQExCf9dBynpDN" // ⚠️ change this (important)
});

// ✅ 1. CREATE ORDER
router.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // ₹ → paise
    currency: "INR",
    receipt: "receipt_order_1",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).send(err);
  }
});

// ✅ 2. VERIFY PAYMENT + SAVE ORDER

router.post('/verify', async (req: any, res: any) => {
  try {
    console.log("REQ BODY 👉", req.body);
    const {
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  shippingAddress,
  totalPrice,
  books,
  userId
} = req.body;

    // 🔥 FIX: Properly format books
    const formattedBooks = (books || []).map((item: any) => ({
  bookId: item.bookId,
  quantity: item.quantity,
  price: item.price || 0
}));

    // ✅ Save order
    const order = new Order({
      userId,
      books,
      totalPrice:totalPrice,
      shippingAddress,
      paymentMethod: 'Razorpay',
      status: 'confirmed'
    });

    await order.save();

    // 🔥 CLEAR CART FROM DB
    await CartItem.deleteMany({ userId });

    res.json({ success: true, order });

  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});

export default router;