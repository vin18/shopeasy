import express from 'express';
import {
  login,
  register,
  logout,
  getMe,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authorization.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, getMe);

export default router;
