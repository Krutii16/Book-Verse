import mongoose, { Schema } from 'mongoose';
import { IGenre } from '../types';

const genreSchema = new Schema<IGenre>(
  {
    name: { type: String, required: true, unique: true },
    description: String
  },
  { timestamps: true }
);

export default mongoose.model<IGenre>('Genre', genreSchema);
