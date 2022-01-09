import express from 'express';
import {
  login,
  register,
  logout,
  getMe,
  updateProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);
router.route('/me').get(protect, getMe);
router.route('/profile').patch(protect, updateProfile);

export default router;
