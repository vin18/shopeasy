import express from 'express';
import {
  getRazorpayKey,
  createRazorpayOrder,
  createRazorpayPayment,
  getSingleOrder,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.get(`/get-razorpay-key`, protect, getRazorpayKey);
router.post(`/create-order`, protect, createRazorpayOrder);
router.post(`/pay-order`, protect, createRazorpayPayment);
router.get(`/:orderId`, protect, getSingleOrder);

export default router;
