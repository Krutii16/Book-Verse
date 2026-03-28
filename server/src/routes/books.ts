import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { searchBooks } from '../controllers/bookController';
const router = Router();



router.get('/', bookController.getAllBooks);
router.get('/featured', bookController.getFeaturedBooks);
router.get('/bestsellers', bookController.getBestsellers);
router.get('/filter', bookController.filterBooks);
router.get('/genre/:genreId', bookController.getBooksByGenre);
router.get('/search', searchBooks);  
router.get('/:id', bookController.getBookById);

router.post('/', authMiddleware, adminMiddleware, bookController.createBook);
router.put('/:id', authMiddleware, adminMiddleware, bookController.updateBook);
router.delete('/:id', authMiddleware, adminMiddleware, bookController.deleteBook);

export default router;