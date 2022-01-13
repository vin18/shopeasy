import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../store/slices/orders';

const Orders = () => {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(allOrders);

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <h1>Orders</h1>
    </div>
  );
};

export default Orders;
