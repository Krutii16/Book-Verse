import { Router } from 'express';
import * as moodController from '../controllers/moodController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Public - Get all moods
router.get('/', moodController.getAllMoods);

// Admin - Create mood
router.post('/', authMiddleware, adminMiddleware, moodController.createMood);

// Admin - Update mood
router.put('/:id', authMiddleware, adminMiddleware, moodController.updateMood);

// Admin - Delete mood
router.delete('/:id', authMiddleware, adminMiddleware, moodController.deleteMood);

export default router;