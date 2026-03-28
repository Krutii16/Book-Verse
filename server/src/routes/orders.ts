import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// ✅ ADMIN ROUTES FIRST (VERY IMPORTANT)
router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllOrders);

// ✅ USER ROUTES
router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/my', authMiddleware, orderController.getMyOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.delete('/:id', authMiddleware, orderController.deleteOrder);
// ✅ UPDATE STATUS
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

export default router;