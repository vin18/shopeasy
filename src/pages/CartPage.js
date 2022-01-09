import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import { fetchProductsInCart } from '../store/slices/cart';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

const CartPage = () => {
  const { cartData, loading } = useSelector((state) => state.cart);
  const { products } = cartData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, []);

  if (loading) return <p>loading</p>;

  return (
    <div className="flex mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 flex-1">
        <h1 className="mb-2 text-4xl">Your cart</h1>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products?.map((product) => (
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
                        <span className="inline-flex leading-5 font-semibold rounded-full text-blue-800">
                          <PlusIcon />
                        </span>
                        <span className="mx-1">{product?.quantity}</span>

                        <span className="inline-flex leading-5 font-semibold rounded-full text-blue-800">
                          <MinusIcon />
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{product.price * product?.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-3">
            <button className="bg-blue-500 text-blue-100 py-1 px-4 rounded">
              Continue Shopping
            </button>
            <button className="bg-red-500 text-blue-100 py-1 px-4 rounded">
              Clear shopping cart
            </button>
          </div>
        </div>
      </div>

      <div className="mx-32 p-4 w-1/4 border-2 border-blue-100 ml-8 mt-24 shadow rounded">
        <div className="flex justify-between mb-1">
          <p>Subtotal</p>
          <p>₹1000</p>
        </div>

        <div className="flex justify-between mb-3">
          <p>Shipping Fee</p>
          <p>₹40</p>
        </div>

        <div className="flex justify-between text-xl font-bold">
          <p>Order Total</p>
          <p>₹1040</p>
        </div>

        <div className="border-b border-blue-100 my-2"></div>

        <div className="mt-5 flex justify-center">
          <button className="bg-blue-500 text-blue-100 px-4 rounded py-1 ">
            Buy products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
