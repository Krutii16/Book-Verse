import mongoose, { Schema } from 'mongoose';
import { ICartItem } from '../types';

const cartItemSchema = new Schema<ICartItem>(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model<ICartItem>('CartItem', cartItemSchema);
