import express from 'express';
import {
  getRazorpayKey,
  createRazorpayOrder,
  createRazorpayPayment,
  getSingleOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/get-razorpay-key`, protect, getRazorpayKey);
router.post(`/create-order`, protect, createRazorpayOrder);
router.post(`/pay-order`, protect, createRazorpayPayment);
router.route(`/`).get(protect, getAllOrders);
router.route('/:orderId').get(protect, getSingleOrder);

export default router;
