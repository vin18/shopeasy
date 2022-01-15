import express from 'express';
import {
  getAllProducts,
  getSingleProduct,
  getAllAdminProducts,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authorization.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.route('/').get(getAllProducts);
router
  .route(`/admin`)
  .get(protect, authorizeRoles('admin'), getAllAdminProducts);
router.route('/:id').get(getSingleProduct);

export default router;
