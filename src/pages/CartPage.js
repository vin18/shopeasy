import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import Loader from '../components/Loader';
import ProductQuantity from '../components/ProductQuantity';
import {
  addProductsToCart,
  clearCart,
  fetchProductsInCart,
  removeProductFromCart,
} from '../store/slices/cart';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const CartPage = () => {
  const { cartData, loading } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, []);

  if (loading) return <Loader />;

  if (!cartData)
    return (
      <div className="flex flex-col items-center mt-32">
        <h2 className="text-4xl mb-4">
          There are currently no items in your cart!
        </h2>
        <button
          onClick={() => history(`/`)}
          className="bg-blue-500 text-blue-100 py-1 px-4 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  const { products } = cartData;

  const totalPrice = products?.reduce(
    (acc, product) => acc + product?.price * product?.quantity,
    0
  );
  const shippingPrice = parseFloat(totalPrice) > 500 ? 50 : 0;
  const orderTotal = parseFloat(shippingPrice) + parseFloat(totalPrice);

  const handleRemoveProductFromCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex-1">
        <h1 className="mb-2 text-4xl">Your cart</h1>
        <div className="py-2 mb-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subtotal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products?.map((product) => {
                  return (
                    <tr key={product?.productId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-32 w-32">
                            <img
                              className="rounded"
                              src={product?.image}
                              alt=""
                            />
                          </div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">₹{product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">
                          <button
                            onClick={() => {
                              const productsData = {
                                productId: product?.productId,
                                quantity: Number(product?.quantity) + 1,
                                name: product?.name,
                                price: product?.price,
                                image: product?.image,
                              };
                              dispatch(addProductsToCart(productsData));
                            }}
                            className="inline-flex leading-5 font-semibold rounded-full text-blue-800"
                            disabled={
                              product?.quantity >= product?.countInStock
                            }
                          >
                            <PlusIcon />
                          </button>
                          <span className="mx-1">{product?.quantity}</span>

                          <button
                            onClick={() => {
                              const productsData = {
                                productId: product?.productId,
                                quantity: Number(product?.quantity) - 1,
                                name: product?.name,
                                price: product?.price,
                                image: product?.image,
                              };
                              dispatch(addProductsToCart(productsData));
                            }}
                            className="inline-flex leading-5 font-semibold rounded-full text-blue-800"
                            disabled={product?.quantity <= 1}
                          >
                            <MinusIcon />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{product.price * product?.quantity}
                      </td>
                      <td>
                        <FaTrash
                          className="mr-1 text-lg text-blue-500"
                          onClick={() =>
                            handleRemoveProductFromCart(product._id)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-3">
            <button
              onClick={() => history(`/`)}
              className="bg-blue-500 text-blue-100 py-1 px-4 rounded"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-blue-100 py-1 px-4 rounded"
            >
              Clear shopping cart
            </button>
          </div>
        </div>
      </div>

      {products?.length !== 0 && (
        <div className="flex justify-center sm:justify-end mt-24">
          <div className="w-64 p-4 border-2 border-blue-100 shadow rounded">
            <div className="flex justify-between mb-1">
              <p>Subtotal</p>
              <p>₹{totalPrice}</p>
            </div>

            <div className="flex justify-between mb-3">
              <p>Shipping Fee</p>
              <p>₹{shippingPrice}</p>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <p>Order Total</p>
              <p>₹{orderTotal}</p>
            </div>

            <div className="border-b border-blue-100 my-2"></div>

            <div className="mt-5 flex justify-center">
              {isLoggedIn ? (
                <button
                  onClick={() => history(`/shipping`)}
                  className="bg-blue-500 text-blue-100 px-4 rounded py-1 "
                >
                  Proceed to checkout
                </button>
              ) : (
                <button
                  onClick={() => history(`/login?redirect=shipping`)}
                  className="bg-blue-500 text-blue-100 px-4 rounded py-1 "
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
