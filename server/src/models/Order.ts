import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types';

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    books: [
      {
        bookId: String,
        quantity: Number,
        price: Number
      }
    ],
    totalPrice: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'confirmed', 'shipped', 'delivered'],
      default: 'pending'
    },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, default: 'Credit Card' },
    deliveryDate: Date
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', orderSchema);
