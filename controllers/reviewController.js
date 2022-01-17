import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import { StatusCodes } from 'http-status-codes';

/**
 * @desc    Get review
 * @route   GET /api/v1/reviews
 * @access  Public
 */
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(StatusCodes.OK).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
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
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: `No review found with id: ${req.params.reviewId}`,
      });
    }

    res.status(StatusCodes.OK).json({
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
 * @desc    Update review
 * @route   PATCH /api/v1/reviews/:reviewId
 * @access  Private
 */
const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;

  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: `No review found with id: ${req.params.reviewId}`,
      });
    }

    if (String(req.user._id) !== String(review.user._id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: `You do not have permission to review`,
      });
    }

    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();

    res.status(StatusCodes.OK).json({
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
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:reviewId
 * @access  Private
 */
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        error: `No review found with id: $${req.params.reviewId}`,
      });
    }

    if (String(req.user._id) !== String(review.user._id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        error: `You do not have permission to review`,
      });
    }

    await review.remove();

    res.status(StatusCodes.OK).json({
      success: true,
      message: `Review removed`,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product review
 * @route   GET /api/v1/reviews/:reviewId
 * @access  Public
 */
const getSingleProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate(
      'user',
      'name'
    );
    res.status(StatusCodes.OK).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
