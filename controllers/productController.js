import { StatusCodes } from 'http-status-codes';
import Product from '../models/productModel.js';

/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  const { keyword } = req.query;
  const searchQuery = keyword
    ? { name: { $regex: keyword, $options: 'i' } }
    : {};

  try {
    const products = await Product.find({ ...searchQuery });

    res.status(StatusCodes.OK).json({
      products,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');

    res.status(StatusCodes.OK).json({
      product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products/admin
 * @access  Private (Admin)
 */
const getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(StatusCodes.OK).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/admin/:productId
 * @access  Private (Admin)
 */
const getAdminProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(StatusCodes.OK).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Update product
 * @route   DELETE /api/products/admin/:productId
 * @access  Private (Admin)
 */
const updateAdminProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/admin/:productId
 * @access  Private (Admin)
 */
const deleteAdminProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product deleted!',
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
};

export {
  getAllProducts,
  getSingleProduct,
  getAllAdminProducts,
  deleteAdminProduct,
  updateAdminProduct,
  getAdminProduct,
};
