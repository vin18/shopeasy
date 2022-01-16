import express from 'express';
import {
  getRazorpayKey,
  createRazorpayOrder,
  createRazorpayPayment,
  getSingleOrder,
  getAllOrders,
  getAllAdminOrders,
  updateOrderDelivered,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authorization.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.get(`/get-razorpay-key`, protect, getRazorpayKey);
router.post(`/create-order`, protect, createRazorpayOrder);
router.post(`/pay-order`, protect, createRazorpayPayment);
router.route(`/`).get(protect, getAllOrders);
router.route('/:orderId').get(protect, getSingleOrder);
router.route(`/admin`).get(protect, authorizeRoles('admin'), getAllAdminOrders);
router
  .route('/admin/order-delivered/:orderId')
  .patch(protect, authorizeRoles('admin'), updateOrderDelivered);

export default router;
