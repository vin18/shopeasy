import express from 'express';
import {
  addItemToCart,
  getUserItemsFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.route('/').get(protect, getUserItemsFromCart);
router.route('/').post(protect, addItemToCart);

export default router;
