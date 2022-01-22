import express from 'express';
import {
  addItemToCart,
  getUserItemsFromCart,
  removeItemFromTheCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router
  .route('/')
  .get(protect, getUserItemsFromCart)
  .post(protect, addItemToCart)
  .delete(protect, clearCart);
router.delete(`/:productId`, protect, removeItemFromTheCart);

export default router;
