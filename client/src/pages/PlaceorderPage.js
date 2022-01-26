import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";

const PlaceorderPage = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { address, city, country, postalCode } = userData;
  const { cartData } = useSelector((state) => state.cart);
  const { products } = cartData;
  const history = useNavigate();

  const shippingAddress = `${address}, ${postalCode}, ${city}, ${country}`;
  const totalProductsPrice = products?.reduce(
    (acc, product) =>
      acc + parseFloat(product?.price) * Number(product?.quantity),
    0
  );
  const shippingPrice = parseFloat(totalProductsPrice) > 500 ? 50 : 0;
  const orderTotal = parseFloat(totalProductsPrice) + parseFloat(shippingPrice);

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    script.onerror = () => {
      toast.error(`Razorpay SDK failed to load!`);
    };
    script.onload = async () => {
      try {
        setLoading(true);

        const razorpayOrder = await axios.post(`/api/v1/orders/create-order`, {
          amount: `${orderTotal}00`,
        });

        const {
          amount: amountPaid,
          id: order_id,
          currency,
        } = razorpayOrder.data.order;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`/api/v1/orders/get-razorpay-key`);

        const options = {
          key: razorpayKey,
          amount: amountPaid.toString(),
          currency,
          name: `Example name`,
          description: `Example transaction`,
          order_id,
          handler: async function (response) {
            const orderObj = {
              amountPaid,
              shippingPrice,
              totalPrice: orderTotal,
              shippingAddress: {
                address,
                city,
                country,
                postalCode,
              },
              orderItems: products,
              paymentInfo: {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
            };
            const { data } = await axios.post(
              `/api/v1/orders/pay-order`,
              orderObj
            );

            toast.success(`Payment successfull!`);
            history(`/orders/${data?.order?._id}`);
          },
          prefill: {
            name: `${userData.username}`,
            email: `${userData.email}`,
            contact: '9876543210',
          },
          theme: {
            color: '#4299e1',
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.error(`ERROR: ${error}`);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  if (loading) return <Loader />

  return (
    <div className="flex flex-col md:flex-row w-full mt-24">
      <div className="flex flex-1 flex-col space-y-8 md:mr-48">
        <div>
          <h3 className="text-3xl mb-1 uppercase">Shipping</h3>
          <p>Address: {shippingAddress}</p>
        </div>

        <div>
          <h3 className="text-3xl mb-1 uppercase">Payment Method</h3>
          <p>Razorpay</p>
        </div>

        <div>
          <h3 className="text-3xl mb-4 uppercase">Order Items</h3>
          {products?.map((product) => {
            const totalProductPrice =
              parseFloat(product?.price) * Number(product?.quantity);

            return (
              <div
                key={product?._id}
                className="flex items-center pb-2 border-b border-gray-300"
              >
                <img className="w-24 mr-8" src={product?.image} alt="" />
                <h2 className="mr-8">{product?.name}</h2>
                <p>
                  {product?.quantity} x ₹{product?.price} = ₹{totalProductPrice}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 md:mt-0">
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

          <button
            className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
            onClick={loadRazorpay}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceorderPage;
