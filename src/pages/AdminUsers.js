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

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { adminUserData, loading, error, userDeleted } = useSelector(
    (state) => state.admin
  );
  const history = useNavigate();

  useEffect(() => {
    dispatch(getAdminUsers());
  }, []);

  useEffect(() => {
    if (userDeleted) {
      toast.success(`User deleted!`);
      setTimeout(() => {
        dispatch(adminUserDeleteReset());
      }, 2000);
      dispatch(getAdminUsers());
    }
  }, [userDeleted]);

  if (loading) return <p>Loading..</p>;

  const handleDeleteUser = (userId) => {
    dispatch(deleteAdminUser(userId));
  };

  const handleUpdateUser = (userId) => {
    return history(`/admin/users/${userId}`);
  };

  return (
    <div className="flex flex-col mt-5">
      <h2 className="text-3xl mb-4 text-blue-600">Admin Users</h2>
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-blue-600 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {adminUserData?.map((user) => (
                  <tr key={user?._id} className="bg-gray-100 border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user?.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {user?.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {user?.role}
                    </td>
                    <td className="flex text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <FaEdit
                        onClick={() => handleUpdateUser(user._id)}
                        className="mr-1 text-lg text-blue-500"
                      />
                      <FaTrash
                        className="mr-1 text-lg text-blue-500"
                        onClick={() => handleDeleteUser(user._id)}
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

export default AdminUsers;
