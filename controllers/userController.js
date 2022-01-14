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

/**
 * @desc    Get logged in user
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(StatusCodes.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Update user profile
 * @route   PATCH /api/v1/users/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  const { name, email, address, city, postalCode, country } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: `User not found`,
      });
    }

    if (name) user.name = name;
    if (address) user.address = address;
    if (city) user.city = city;
    if (postalCode) user.postalCode = postalCode;
    if (country) user.country = country;

    await user.save();
    sendResponse(user, res);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/v1/users/admin
 * @access  Private (Admin)
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single user
 * @route   GET /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(StatusCodes.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Update user
 * @route   PATCH /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.OK).json({
      success: true,
      user: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'User deleted',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

export {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  getUsers,
  deleteUser,
  getSingleUser,
  updateUser,
};
