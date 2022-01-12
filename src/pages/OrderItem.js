import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const OrderItemPage = () => {
  const [order, setOrder] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await axios.get(`/api/v1/orders/${orderId}`);
      setOrder(data?.order);
    }
    fetchOrder();
  }, []);

  if (!order) return <p>Loading..</p>;

  const {
    _id: orderID,
    shippingAddress,
    totalPrice: totalProductsPrice,
    amountPaid: orderTotal,
    shippingPrice,
    orderItems,
    paidAt,
    paymentInfo,
  } = order;
  const paymentSuccessful = paymentInfo?.paymentId;
  const { address, city, country, postalCode } = shippingAddress;
  const addressStr = `${address}, ${city}, ${country}, ${postalCode}`;

  return (
    <div className="flex w-full mt-24">
      <div className="flex flex-1 flex-col space-y-8 mr-64">
        <div>
          <h3 className="text-3xl mb-1 uppercase">OrderID</h3>
          <p>{orderID}</p>
        </div>
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
          {orderItems?.map((product) => {
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

          <div className="flex justify-between text-xl">
            <p>Payment</p>
            <p className={`text-${paymentSuccessful ? 'green' : 'red'}-600`}>
              {paymentSuccessful ? 'Successful' : 'Fail'}
            </p>
          </div>

          {paymentSuccessful && (
            <div className="flex justify-between text-xl">
              <p>Paid At</p>
              <p>{moment(paidAt).format(`DD/MM/YYYY HH:MM`)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemPage;
