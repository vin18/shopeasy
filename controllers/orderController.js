import Razorpay from 'razorpay';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
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
    throw new BadRequestError(
      `Some error occurred while creating a razorpay order`
    );
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    order,
  });
};

/**
 * @desc    Create Razorpay payment
 * @route   POST /api/orders/pay-order
 * @access  Private
 */
const createRazorpayPayment = async (req, res) => {
  const {
    amountPaid,
    shippingPrice,
    orderItems,
    totalPrice,
    shippingAddress,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    user: req.user._id,
    amountPaid: parseFloat(amountPaid) / 100,
    shippingPrice,
    totalPrice,
    orderItems,
    shippingAddress,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    order,
  });
};

/**
 * @desc    Get single order
 * @route   GET /api/orders/:orderId
 * @access  Private
 */
const getSingleOrder = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError(`No order found with id: ${orderId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private
 */
const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(StatusCodes.OK).json({
    success: true,
    count: orders.length,
    orders,
  });
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private (Admin)
 */
const getAllAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'id name');

    res.status(StatusCodes.OK).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Update delivered order
 * @route   PATCH /api/orders/admin/delivered-order/:orderId
 * @access  Private (Admin)
 */
const updateOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: `No order found with id: ${orderId}`,
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(StatusCodes.OK).json({
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

export {
  getRazorpayKey,
  createRazorpayOrder,
  createRazorpayPayment,
  getSingleOrder,
  getAllOrders,
  getAllAdminOrders,
  updateOrderDelivered,
};
