import mongoose, { Schema } from 'mongoose';
import { IBook } from '../types';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    language: { type: String, default: 'English' },
    pages: { type: Number },
    publisher: { type: String },
    year: { type: Number },
    moods: [String],
    keywords: [String],
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    bestseller: { type: Boolean, default: false }
  },
  { timestamps: true }
);
bookSchema.pre('save', function (next) {
  this.inStock = this.quantity > 0;
  next();
});

export default mongoose.model<IBook>('Book', bookSchema);
