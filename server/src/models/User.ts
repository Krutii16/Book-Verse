import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    address: String,
    city: String,
    zipcode: String,
    country: String,
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
