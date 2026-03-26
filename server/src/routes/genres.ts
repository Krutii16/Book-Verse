import { Router } from 'express';
import * as genreController from '../controllers/genreController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', genreController.getAllGenres);
router.post('/', authMiddleware, adminMiddleware, genreController.createGenre);
router.put('/:id', authMiddleware, adminMiddleware, genreController.updateGenre);
router.delete('/:id', authMiddleware, adminMiddleware, genreController.deleteGenre);

export default router;
