import cloudinary from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';
import Product from '../models/productModel.js';

/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Public
 */
const getAllProducts = async (req, res) => {
  const { keyword, pageNumber: page = 1 } = req.query;
  const queryObject = {};
  const pageSize = 6;

  if (keyword) {
    queryObject.name = { $regex: keyword, $options: 'i' };
  }

  let results = Product.find(queryObject)
    .limit(pageSize)
    .skip(pageSize * (Number(page) - 1));
  const products = await results;
  const count = await Product.countDocuments();

  res.status(StatusCodes.OK).json({
    success: true,
    count,
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
};

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId).populate('reviews');

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
};

/**
 * @desc    Get single product
 * @route   GET /api/products/admin/:productId
 * @access  Private (Admin)
 */
const getAdminProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
};

/**
 * @desc    Create  product
 * @route   GET /api/products/admin
 * @access  Private (Admin)
 */
const createAdminProduct = async (req, res) => {
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
};

/**
 * @desc    Update product
 * @route   DELETE /api/products/admin/:productId
 * @access  Private (Admin)
 */
const updateAdminProduct = async (req, res) => {
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
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/admin/:productId
 * @access  Private (Admin)
 */
const deleteAdminProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Product deleted!',
  });
};

export {
  getAllProducts,
  getSingleProduct,
  createAdminProduct,
  deleteAdminProduct,
  updateAdminProduct,
  getAdminProduct,
};
