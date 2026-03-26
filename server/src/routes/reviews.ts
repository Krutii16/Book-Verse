import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/book/:bookId', reviewController.getReviewsByBook);
router.get('/user/:userId', reviewController.getReviewsByUser);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

export default router;
