import express from 'express';
import {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.route(`/`).post(protect, createReview).get(getAllReviews);
router
  .route(`/:reviewId`)
  .get(getSingleReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

export default router;
