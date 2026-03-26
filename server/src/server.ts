import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import reviewRoutes from './routes/reviews';
import genreRoutes from './routes/genres';
import moodRoutes from './routes/moods';
import keywordRoutes from './routes/keywords';
import { adminMiddleware } from './middleware/auth';
import userRoutes from './routes/user';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/admin', adminMiddleware, adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
