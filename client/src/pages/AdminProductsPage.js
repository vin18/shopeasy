import { useEffect } from 'react';
import {
  getAdminUsers,
  deleteAdminUser,
  adminUserDeleteReset,
} from '../store/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/products';
import {
  deleteAdminProduct,
  adminProductDeleteReset,
} from '../store/slices/product';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';

const AdminProducts = () => {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const { productsData, loading, error, page, pages } = useSelector(
    (state) => state.products
  );
  const { productDeleted } = useSelector((state) => state.product);
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts('', pageNumber));
  }, [pageNumber]);

  useEffect(() => {
    if (productDeleted) {
      toast.success(`Product deleted!`);
      setTimeout(() => {
        dispatch(adminProductDeleteReset());
      }, 2000);
      dispatch(fetchProducts('', pageNumber));
    }
  }, [productDeleted, pageNumber]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteAdminProduct(productId));
  };

  const handleUpdateProduct = (productId) => {
    return history(`/admin/products/edit/${productId}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center flex-col mt-5 overflow-auto">
      <h2 className="text-3xl mb-4 font-bold text-blue-500">Admin Products</h2>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block sm:px-6 lg:px-8">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => history(`/admin/products/create`)}
              className="mt-4 px-4 bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
            >
              Create Product
            </button>
          </div>
          <div className="overflow-auto">
            <table className="border shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="font-medium text-blue-600 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {productsData?.map((product) => (
                  <tr key={product?._id} className="bg-gray-100 border-b">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {product?._id}
                    </td>
                    <td className="text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                      {product?.name}
                    </td>
                    <td className="text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                      {product?.price}
                    </td>
                    <td className="text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                      {product?.category}
                    </td>
                    <td className="text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                      {product?.brand}
                    </td>
                    <td className="flex text-gray-700 font-light px-6 py-4 whitespace-nowrap">
                      <FaEdit
                        onClick={() => handleUpdateProduct(product._id)}
                        className="mr-2 text-lg text-blue-500"
                      />
                      <FaTrash
                        className="mr-2 text-lg text-blue-500"
                        onClick={() => handleDeleteProduct(product._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
