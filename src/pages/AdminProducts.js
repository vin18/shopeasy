import { useEffect } from 'react';
import {
  getAdminUsers,
  deleteAdminUser,
  adminUserDeleteReset,
} from '../store/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchAdminProducts } from '../store/slices/products';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { adminProductsData, loading, error } = useSelector(
    (state) => state.products
  );
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  if (loading) return <p>Loading..</p>;

  const handleDeleteProduct = (productId) => {
    dispatch(deleteAdminUser(productId));
  };

  const handleUpdateProduct = (productId) => {
    return history(`/admin/products/${productId}`);
  };

  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-3xl mb-4 text-blue-600">Admin Products</h2>
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
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {adminProductsData?.map((product) => (
                  <tr key={product?._id} className="bg-gray-100 border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product?._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product?.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product?.price}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product?.category}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {product?.brand}
                    </td>
                    <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <FaEdit
                        onClick={() => handleUpdateProduct(product._id)}
                        className="mr-1 text-lg text-blue-500"
                      />
                      <FaTrash
                        className="mr-1 text-lg text-blue-500"
                        onClick={() => handleDeleteProduct(product._id)}
                      />
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

export default AdminProducts;
