import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import { sendResponse } from '../utils/sendResponse.js';

/**
 * @desc    Register user
 * @route   POST /api/v1/users/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: `Email already exists!` });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    sendResponse(user, res);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Register user
 * @route   POST /api/v1/users/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: `Invalid credentials!` });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: `Invalid credentials!` });
    }

    sendResponse(user, res);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Logout user
 * @route   GET /api/v1/users/logout
 * @access  Private
 */
const logout = async (req, res) => {
  res.cookie('token', null, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User logged out',
  });
};

export { register, login, logout };
