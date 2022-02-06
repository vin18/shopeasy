import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { orderDelivered, orderDeliveredReset } from '../store/slices/orders';
import Loader from '../components/Loader';

const OrderItemPage = () => {
  const [order, setOrder] = useState();
  const { userData } = useSelector((state) => state.user);
  const { orderDelivered: orderDeliveredStatus } = useSelector(
    (state) => state.orders
  );
  const { orderId } = useParams();
  const dispatch = useDispatch();

  async function fetchOrder() {
    const { data } = await axios.get(`/api/v1/orders/${orderId}`);
    setOrder(data?.order);
  }

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (orderDeliveredStatus) {
      toast.success(`Order delivered!`);
      fetchOrder();
      setTimeout(() => {
        dispatch(orderDeliveredReset());
      }, 2000);
    }
  }, [orderDeliveredStatus]);

  if (!order) return <Loader />;

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

  const handleOrderDelivered = () => {
    dispatch(orderDelivered(orderId));
  };

  return (
    <div className="flex flex-col lg:flex-row mt-18">
      <div className="flex flex-1 flex-col space-y-8">
        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Order ID
          </h3>
          <p>{orderID}</p>
        </div>

        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Shipping
          </h3>
          <p>Address: {addressStr}</p>
        </div>

        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Payment Method
          </h3>
          <p>Razorpay</p>
        </div>

        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Paid At
          </h3>
          <p>
            {order.paidAt
              ? moment(order.paidAt).format(`DD-MM-YYYY, HH:mm`)
              : 'Not Paid'}
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Delivered
          </h3>
          <p className={!order.isDelivered ? 'text-red-500' : 'text-green-500'}>
            {order.isDelivered ? 'Delivered' : 'Not Delivered'}
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-blue-500 font-bold mb-1 uppercase">
            Order Items
          </h3>
          {orderItems?.map((product) => {
            return (
              <div
                key={product?._id}
                className="flex justify-between items-center border-b border-gray-300 max-w-lg py-4"
              >
                <img
                  className="w-32 "
                  src={product?.image}
                  alt="product image"
                />
                <h2>{product?.name}</h2>
                <p>
                  {product?.quantity} x ₹{product?.price} = ₹
                  {parseFloat(product?.quantity) * parseFloat(product?.price)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 lg:mt-0">
        <div className="border border-gray-300 px-8 py-4 rounded shadow space-y-2">
          <h3 className="text-2xl text-blue-500 font-bold mb-4 uppercase">
            Order Summary
          </h3>

          <div className="flex justify-between">
            <p className="">Items</p>
            <p>₹{totalProductsPrice}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>₹{shippingPrice}</p>
          </div>

          <div className="flex justify-between">
            <p>Total</p>
            <p>₹{orderTotal}</p>
          </div>

          <div className="flex justify-between">
            <p>Payment</p>
            <p className={`text-${paymentSuccessful ? 'green' : 'red'}-500 fo`}>
              {paymentSuccessful ? 'Successful' : 'Fail'}
            </p>
          </div>

          {paymentSuccessful && (
            <div className="flex justify-between">
              <p>Paid At</p>
              <p>{moment(paidAt).format(`DD/MM/YYYY HH:MM`)}</p>
            </div>
          )}
        </div>
        {!order.isDelivered && userData?.role === 'admin' && (
          <div className="flex justify-center">
            <button
              onClick={handleOrderDelivered}
              className="mt-4 px-4 bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
            >
              Mark as delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemPage;
