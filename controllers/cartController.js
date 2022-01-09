import { StatusCodes } from 'http-status-codes';
import Cart from '../models/cartModel.js';

/**
 * @desc    Get all products from the cart
 * @route   GET /api/v1/cart
 * @access  Private
 */
const getUserItemsFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });

    res.status(StatusCodes.OK).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

/**
 * @desc    Add or Update item from the cart
 * @route   POST /api/v1/cart
 * @access  Private
 */
const addItemToCart = async (req, res) => {
  const { productId, quantity, name, price, image } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId === productId);

      if (itemIndex > -1) {
        // product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
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

      return res.status(StatusCodes.CREATED).json({
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

      return res.status(StatusCodes.CREATED).json({
        success: true,
        cart: newCart,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      error: error.message,
    });
  }
};

export { getUserItemsFromCart, addItemToCart };
