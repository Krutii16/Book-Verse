import mongoose, { Schema } from 'mongoose';
import { IMood } from '../types';

const moodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    icon: String
  },
  { timestamps: true }
);

export default mongoose.model('Mood', moodSchema);
