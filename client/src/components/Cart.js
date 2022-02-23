import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import Loader from '../components/Loader';
import {
  addProductsToCart,
  clearCart,
  fetchProductsInCart,
  removeProductFromCart,
} from '../store/slices/cart';

const Cart = () => {
  const { cartData, loading } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, [dispatch]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center mt-32">
        <h2 className="text-4xl mb-4">Please login to continue</h2>
        <button
          onClick={() => history(`/login`)}
          className="bg-indigo-500 text-indigo-100 py-1 px-4 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) return <Loader />;

  if (cartData?.length === 0 || cartData?.products?.length === 0) {
    return (
      <div className="flex flex-col items-center mt-32">
        <h2 className="text-4xl mb-4">
          There are currently no items in your cart!
        </h2>
        <button
          onClick={() => history(`/products`)}
          className="bg-indigo-500 text-indigo-100 py-1 px-4 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const { products } = cartData;

  const totalPrice = products?.reduce(
    (acc, product) => acc + product?.price * product?.quantity,
    0
  );
  const shippingPrice = parseFloat(totalPrice) < 500 ? 50 : 0;
  const orderTotal = parseFloat(shippingPrice) + parseFloat(totalPrice);

  const handleRemoveProductFromCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col lg:flex-row mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:mx-8 flex-1">
        <h1 className="mb-2 text-4xl">Your cart</h1>
        <div className="py-2 mb-2 align-middle sm:px-6 lg:px-8">
          <div className="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y w-full divide-gray-200">
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
                          <div className="flex items-center h-32 w-32">
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
                                image: product?.image?.url,
                              };
                              dispatch(addProductsToCart(productsData));
                            }}
                            className={`inline-flex leading-5 font-semibold rounded-full text-indigo-800 ${
                              product?.quantity >= product?.countInStock &&
                              'opacity-80 cursor-not-allowed'
                            }`}
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
                                image: product?.image?.url,
                              };
                              dispatch(addProductsToCart(productsData));
                            }}
                            className={`inline-flex leading-5 font-semibold rounded-full text-indigo-800 ${
                              product?.quantity <= 1 &&
                              'opacity-80 cursor-not-allowed'
                            }`}
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
                          className="mr-1 text-lg text-indigo-500"
                          onClick={() =>
                            handleRemoveProductFromCart(product.productId)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between mt-3">
            <button
              onClick={() => history(`/products`)}
              className="bg-indigo-500 text-indigo-100 py-1 px-4 rounded mb-2"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-indigo-100 py-1 px-4 rounded"
            >
              Clear shopping cart
            </button>
          </div>
        </div>
      </div>

      {products?.length !== 0 && (
        <div className="md:mx-8 mt-5 lg:mt-12 flex justify-center items-start sm:justify-end">
          <div className="p-6 border-2 border-indigo-100 shadow rounded">
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

            <div className="border-b border-indigo-100 my-2"></div>

            <div className="mt-5 flex justify-center">
              {isLoggedIn ? (
                <button
                  onClick={() => history(`/shipping`)}
                  className="bg-indigo-500 text-indigo-100 px-4 rounded py-1 "
                >
                  Proceed to checkout
                </button>
              ) : (
                <button
                  onClick={() => history(`/login?redirect=shipping`)}
                  className="bg-indigo-500 text-indigo-100 px-4 rounded py-1 "
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

export default Cart;
