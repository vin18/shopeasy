import React from 'react';
import { useSelector } from 'react-redux';

const PlaceorderPage = () => {
  const { userData } = useSelector((state) => state.user);
  const { address, city, country, postalCode } = userData;
  const { cartData } = useSelector((state) => state.cart);
  const { products } = cartData;

  const addressStr = `${address}, ${postalCode}, ${city}, ${country}`;

  const totalProductsPrice = products?.reduce(
    (acc, product) => acc + product?.price,
    0
  );

  const shippingPrice = parseFloat(totalProductsPrice) > 500 ? 50 : 0;

  const orderTotal = parseFloat(totalProductsPrice) + parseFloat(shippingPrice);

  return (
    <div className="flex w-full mt-24">
      <div className="flex flex-1 flex-col space-y-8 mr-64">
        <div>
          <h3 className="text-3xl mb-1 uppercase">Shipping</h3>
          <p>Address: {addressStr}</p>
        </div>

        <div>
          <h3 className="text-3xl mb-1 uppercase">Payment Method</h3>
          <p>Razorpay</p>
        </div>

        <div>
          <h3 className="text-3xl mb-1 uppercase">Order Items</h3>
          {products?.map((product) => {
            return (
              <div
                key={product?._id}
                className="flex items-center border-b border-gray-300"
              >
                <img className="w-24 mr-8" src={product?.image} alt="" />
                <h2 className="mr-8">{product?.name}</h2>
                <p>
                  {product?.quantity} x ₹{product?.price} = ₹
                  {totalProductsPrice}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="border border-gray-300 px-8 py-4 rounded shadow space-y-2">
          <h3 className="text-3xl mb-4 uppercase">Order Summary</h3>

          <div className="flex justify-between text-xl">
            <p className="">Items</p>
            <p>₹{totalProductsPrice}</p>
          </div>

          <div className="flex justify-between text-xl">
            <p>Shipping</p>
            <p>₹{shippingPrice}</p>
          </div>

          <div className="flex justify-between text-xl">
            <p>Total</p>
            <p>₹{orderTotal}</p>
          </div>

          <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderPage;
