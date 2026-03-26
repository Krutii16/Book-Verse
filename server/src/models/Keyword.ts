import mongoose, { Schema } from 'mongoose';
import { IKeyword } from '../types';

const keywordSchema = new Schema<IKeyword>(
  {
    name: { type: String, required: true, unique: true },
    category: String
  },
  { timestamps: true }
);

export default mongoose.model<IKeyword>('Keyword', keywordSchema);
