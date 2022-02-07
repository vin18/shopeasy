import express from 'express';
import {
  createUpdateBookmark,
  getWishlistProducts,
} from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.post(`/:productId`, protect, createUpdateBookmark);
router.get(`/`, protect, getWishlistProducts);

export default router;
