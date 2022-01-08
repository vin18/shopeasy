import User from '../models/userModel.js';
import { sendResponse } from '../utils/sendResponse.js';

/**
 * @desc    Register user
 * @route   POST /api/v1/users
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

export { register };
