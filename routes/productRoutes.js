import express from 'express';
import {
  getAllProducts,
  getSingleProduct,
  getAllAdminProducts,
  deleteAdminProduct,
  updateAdminProduct,
  getAdminProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authorization.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.route('/').get(getAllProducts);
router
  .route(`/admin`)
  .get(protect, authorizeRoles('admin'), getAllAdminProducts);
router
  .route(`/admin/:productId`)
  .get(protect, authorizeRoles('admin'), getAdminProduct)
  .patch(protect, authorizeRoles('admin'), updateAdminProduct)
  .delete(protect, authorizeRoles('admin'), deleteAdminProduct);
router.route('/:id').get(getSingleProduct);

export default router;
