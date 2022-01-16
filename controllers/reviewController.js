import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @desc    Get review
 * @route   GET /api/v1/reviews
 * @access  Public
 */
const getAllReviews = async (req, res) => {
  res.send('get all reviews');
};

/**
 * @desc    Create review
 * @route   POST /api/v1/reviews
 * @access  Private
 */
const createReview = async (req, res) => {
  const { product: productId } = req.body;

  try {
    const isValidProduct = await Product.findById(productId);

    if (!isValidProduct) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: `No product with id: ${productId}`,
      });
    }

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id,
    });
    if (alreadyReviewed) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: `Product already reviewed`,
      });
    }

    req.body.user = req.user._id;

    const review = await Review.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get review
 * @route   GET /api/v1/reviews/:reviewId
 * @access  Public
 */
const getSingleReview = async (req, res) => {
  res.send('single review');
};

/**
 * @desc    Update review
 * @route   PATCH /api/v1/reviews/:reviewId
 * @access  Private
 */
const updateReview = async (req, res) => {
  res.send('update review');
};

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:reviewId
 * @access  Private
 */
const deleteReview = async (req, res) => {
  res.send('delete review');
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
