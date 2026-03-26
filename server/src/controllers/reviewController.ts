import { Request, Response } from 'express';
import Review from '../models/Review';
import User from '../models/User';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { bookId, rating, comment } = req.body;

    if (!bookId || !rating || !comment) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const user = await User.findById(req.userId);
    const review = new Review({
      bookId,
      userId: req.userId,
      userName: user?.name || 'Anonymous',
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review created', review });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsByBook = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsByUser = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId !== req.userId && !req.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
