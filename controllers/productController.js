import cloudinary from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import Product from '../models/productModel.js';

/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  const { keyword, pageNumber: page = 1 } = req.query;
  const pageSize = 6;

  const searchQuery = keyword
    ? { name: { $regex: keyword, $options: 'i' } }
    : {};

  try {
    const count = await Product.countDocuments({ ...searchQuery });
    const products = await Product.find({ ...searchQuery })
      .limit(pageSize)
      .skip(pageSize * (Number(page) - 1));

    res.status(StatusCodes.OK).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
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
 * @desc    Create  product
 * @route   GET /api/products/admin
 * @access  Private (Admin)
 */
const createAdminProduct = async (req, res) => {
  try {
    const { name, price, image, description, countInStock, category, brand } =
      req.body;

    const uploadedImage = await cloudinary.v2.uploader.upload(image, {
      folder: `shopeasy/products`,
    });

    const newProduct = await Product.create({
      name,
      price,
      description,
      countInStock,
      category,
      brand,
      image: {
        public_id: uploadedImage.public_id,
        url: uploadedImage.secure_url,
      },
    });

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      product: newProduct,
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
    const { image, productImage } = req.body;

    await cloudinary.v2.uploader.destroy(image.public_id);
    const uploadedImage = await cloudinary.v2.uploader.upload(productImage, {
      folder: 'bookeasy/rooms',
    });

    req.body.image = {
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    };

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
  createAdminProduct,
  deleteAdminProduct,
  updateAdminProduct,
  getAdminProduct,
};
