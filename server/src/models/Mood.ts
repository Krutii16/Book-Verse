import mongoose, { Schema } from 'mongoose';
import { IMood } from '../types';

const moodSchema = new Schema<IMood>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    icon: String
  },
  { timestamps: true }
);

export default mongoose.model<IMood>('Mood', moodSchema);
