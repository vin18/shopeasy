import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc    Get review
 * @route   GET /api/v1/reviews
 * @access  Public
 */
const getAllReviews = async (req, res) => {
  const reviews = await Review.find();

  res.status(StatusCodes.OK).json({
    success: true,
    count: reviews.length,
    reviews,
  });
};

/**
 * @desc    Create review
 * @route   POST /api/v1/reviews
 * @access  Private
 */
const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findById(productId);

  if (!isValidProduct) {
    throw new BadRequestError(`No product with id: ${productId}`);
  }

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user._id,
  });
  if (alreadyReviewed) {
    throw new BadRequestError(`Product already reviewed`);
  }

  req.body.user = req.user._id;

  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    review,
  });
};

/**
 * @desc    Get review
 * @route   GET /api/v1/reviews/:reviewId
 * @access  Public
 */
const getSingleReview = async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    review,
  });
};

/**
 * @desc    Update review
 * @route   PATCH /api/v1/reviews/:reviewId
 * @access  Private
 */
const updateReview = async (req, res) => {
  const { rating, title, comment } = req.body;
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewId}`);
  }

  if (String(req.user._id) !== String(review.user._id)) {
    throw new BadRequestError(`You do not have permission to review`);
  }

  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.status(StatusCodes.OK).json({
    success: true,
    review,
  });
};

/**
 * @desc    Delete review
 * @route   DELETE /api/v1/reviews/:reviewId
 * @access  Private
 */
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewId}`);
  }

  if (String(req.user._id) !== String(review.user._id)) {
    throw new BadRequestError(`You do not have permission to review`);
  }

  await review.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Review removed`,
  });
};

/**
 * @desc    Get single product review
 * @route   GET /api/v1/reviews/:reviewId
 * @access  Public
 */
const getSingleProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.id }).populate(
    'user',
    'name'
  );

  res.status(StatusCodes.OK).json({
    success: true,
    count: reviews.length,
    reviews,
  });
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
