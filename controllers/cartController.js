import { StatusCodes } from 'http-status-codes';
import Cart from '../models/cartModel.js';

/**
 * @desc    Get all products from the cart
 * @route   GET /api/v1/cart
 * @access  Private
 */
const getUserItemsFromCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });

  res.status(StatusCodes.OK).json({
    success: true,
    cart,
  });
};

/**
 * @desc    Add or Update item from the cart
 * @route   POST /api/v1/cart
 * @access  Private
 */
const addItemToCart = async (req, res) => {
  const { productId, quantity, name, price, image } = req.body;
  const userId = req.user._id;

  let cart = await Cart.findOne({ userId });

  if (cart) {
    // cart exists for user
    let itemIndex = cart.products.findIndex((p) => p.productId === productId);

    if (itemIndex > -1) {
      // product exists in the cart, update the quantity
      let productItem = cart.products[itemIndex];
      productItem.quantity = quantity;
      cart.products[itemIndex] = productItem;

      cart = await cart.save();
    } else {
      // product does not exists in cart, add new item
      cart.products.push({
        productId,
        quantity,
        name,
        price,
        image,
      });

      cart = await cart.save();
    }

    res.status(StatusCodes.CREATED).json({
      success: true,
      cart,
    });
  } else {
    // no cart for user, create new cart
    const newCart = await Cart.create({
      userId,
      products: [
        {
          productId,
          quantity,
          name,
          price,
          image,
        },
      ],
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      cart: newCart,
    });
  }
};

/**
 * @desc    Remove Item from the cart
 * @route   DELETE /api/v1/cart/:productId
 * @access  Private
 */
const removeItemFromTheCart = async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });

  let itemIndex = cart.products.findIndex(
    (p) => p.productId === req.params.productId
  );

  console.log('Cart', cart);

  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
  }

  cart = await cart.save();

  res.status(StatusCodes.OK).json({
    success: true,
    cart,
  });
};

/**
 * @desc    Clear cart
 * @route   DELETE /api/v1/cart
 * @access  Private
 */
const clearCart = async (req, res) => {
  await Cart.deleteMany({ userId: req.user._id });

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Removed all the products from the cart`,
  });
};

export {
  getUserItemsFromCart,
  addItemToCart,
  removeItemFromTheCart,
  clearCart,
};
