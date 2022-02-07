import { StatusCodes } from 'http-status-codes';
import Wishlist from '../models/wishlistModel.js';

/**
 * @desc    Get all bookmarks
 * @route   GET /api/v1/bookmarks
 * @access  Private
 */
const getWishlistProducts = async (req, res) => {
  const userId = req.user._id;
  const products = await Wishlist.find({ user: userId });

  res.status(StatusCodes.OK).json({
    success: true,
    products,
  });
};

/**
 * @desc    Create bookmark
 * @route   POST /api/v1/bookmarks/:productId
 * @access  Private
 */
const createUpdateBookmark = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  let wishlist = await Wishlist.findOne({
    user: userId,
    product: productId,
  });

  if (wishlist) {
    if (wishlist.isLiked) {
      await wishlist.remove();
      wishlist = null;
    } else {
      wishlist.isLiked = true;
      wishlist = await wishlist.save();
    }

    res.status(StatusCodes.OK).json({
      success: true,
      wishlist,
    });
  } else {
    const newWishlist = await Wishlist.create({
      user: userId,
      product: productId,
      isLiked: true,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      wishlist: newWishlist,
    });
  }
};

export { createUpdateBookmark, getWishlistProducts };
