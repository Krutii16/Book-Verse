import { Router } from 'express';
import * as keywordController from '../controllers/keywordController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', keywordController.getAllKeywords);
router.post('/', authMiddleware, adminMiddleware, keywordController.createKeyword);
router.put('/:id', authMiddleware, adminMiddleware, keywordController.updateKeyword);
router.delete('/:id', authMiddleware, adminMiddleware, keywordController.deleteKeyword);

export default router;
