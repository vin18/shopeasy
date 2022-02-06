import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import User from '../models/userModel.js';
import { sendResponse } from '../utils/sendResponse.js';

/**
 * @desc    Register user
 * @route   POST /api/v1/users/register
 * @access  Public
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError(`Email already exists!`);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  sendResponse(user, res, StatusCodes.CREATED);
};

/**
 * @desc    Register user
 * @route   POST /api/v1/users/login
 * @access  Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnAuthenticatedError(`Invalid credentials!`);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError(`Invalid credentials!`);
  }

  sendResponse(user, res, StatusCodes.OK);
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
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

/**
 * @desc    Update user profile
 * @route   PATCH /api/v1/users/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
  const { name, email, address, city, postalCode, country } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  if (name) user.name = name;
  if (address) user.address = address;
  if (city) user.city = city;
  if (postalCode) user.postalCode = postalCode;
  if (country) user.country = country;

  await user.save();
  sendResponse(user, res, StatusCodes.OK);
};

/**
 * @desc    Get all users
 * @route   GET /api/v1/users/admin
 * @access  Private (Admin)
 */
const getUsers = async (req, res) => {
  const users = await User.find();

  res.status(StatusCodes.OK).json({
    success: true,
    users,
  });
};

/**
 * @desc    Get single user
 * @route   GET /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

/**
 * @desc    Update user
 * @route   PATCH /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new BadRequestError(`Invalid user`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    user,
  });
};

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/admin/:userId
 * @access  Private (Admin)
 */
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);
  if (!user) {
    throw new BadRequestError(`Invalid user`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'User deleted',
  });
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
