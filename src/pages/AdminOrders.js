import { useEffect } from 'react';
import {
  getAdminUsers,
  deleteAdminUser,
  adminUserDeleteReset,
  getAdminOrders,
} from '../store/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { adminOrders, loading, error } = useSelector((state) => state.admin);
  const history = useNavigate();

  useEffect(() => {
    dispatch(getAdminOrders());
  }, []);

  if (loading) return <p>Loading..</p>;

  console.log('adminOrders', adminOrders);

  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-3xl mb-4 text-blue-600">Admin Orders</h2>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border shadow-lg">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Paid
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Delivered
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {adminOrders?.map((order) => (
                  <tr key={order?._id} className="bg-gray-100 border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order?._id}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order?.user?.name}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {moment(order?.paidAt).format(`DD-MM-YYYY, HH:mm`)}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{order?.amountPaid}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.paidAt ? <FaCheck /> : <FaTimes />}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.isDelivered ? <FaCheck /> : <FaTimes />}
                    </td>

                    <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => history(`/orders/${order._id}`)}
                        className=" bg-blue-500 text-indigo-100 p-2 rounded-md tracking-wide"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
