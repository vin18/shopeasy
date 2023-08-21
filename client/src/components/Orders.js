import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../store/slices/orders'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Orders = () => {
  const dispatch = useDispatch()
  const { allOrders, loading } = useSelector((state) => state.orders)
  const history = useNavigate()

  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [dispatch])

  if (allOrders?.length === 0) {
    return (
      <h2 className="mx-auto text-2xl mt-64">There are currently no orders!</h2>
    )
  }

  return (
    <div className="flex flex-col items-center mt-12 lg:ml-16 overflow-auto">
      <h2 className="text-center text-2xl font-bold text-indigo-500 mb-4">
        My Orders
      </h2>

      <table className="border shadow-md">
        <thead className="bg-white border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-left"
            >
              Order ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-center"
            >
              Date
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-left"
            >
              Total
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-left"
            >
              Paid
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-left"
            >
              Delivered
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-indigo-600 px-6 py-4 text-left"
            ></th>
          </tr>
        </thead>
        <tbody>
          {allOrders?.map((order) => (
            <tr key={order?._id} className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order?._id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {moment(order?.paidAt).format(`DD-MM-YYYY, HH:mm`)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                ₹{order?.amountPaid}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order?.paidAt ? (
                  <FaCheck className="ml-2" />
                ) : (
                  <FaTimes className="ml-2" />
                )}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {order?.isDelivered ? (
                  <FaCheck className="ml-4" />
                ) : (
                  <FaTimes className="ml-4" />
                )}
              </td>
              <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-indigo-500 text-indigo-100 py-2 px-4 rounded-md tracking-wide"
                  onClick={() => history(`/orders/${order?._id}`)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
