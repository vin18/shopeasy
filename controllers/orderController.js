import { StatusCodes } from 'http-status-codes';
import Razorpay from 'razorpay';
import Order from '../models/orderModel.js';

/**
 * @desc    Get Razorpay key
 * @route   GET /api/orders/get-razorpay-key
 * @access  Public
 */
const getRazorpayKey = (req, res) => {
  res.status(StatusCodes.OK).send({ key: process.env.RAZORPAY_KEY_ID });
};

/**
 * @desc    Create Razorpay Order
 * @route   POST /api/orders/create-order
 * @access  Private
 */
const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: `Some error occurred while creating a razorpay order`,
      });
    }

    res.status(StatusCodes.CREATED).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Create Razorpay payment
 * @route   POST /api/orders/pay-order
 * @access  Private
 */
const createRazorpayPayment = async (req, res) => {
  try {
    const {
      amountPaid,
      shippingPrice,
      totalPrice,
      shippingAddress,
      paymentInfo,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      amountPaid: parseFloat(amountPaid) / 100,
      shippingPrice,
      totalPrice,
      shippingAddress,
      paymentInfo,
      paidAt: Date.now(),
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export { getRazorpayKey, createRazorpayOrder, createRazorpayPayment };
