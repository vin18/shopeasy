import express from 'express';
import {
  login,
  register,
  logout,
  getMe,
  updateProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authorization.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);
router.route('/me').get(protect, getMe);
router.route('/profile').patch(protect, updateProfile);
router.route(`/admin`).get(protect, authorizeRoles('admin'), getUsers);
router
  .route(`/admin/:userId`)
  .delete(protect, authorizeRoles('admin'), deleteUser);

export default router;
