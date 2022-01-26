import { useState, useEffect } from 'react';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import Checkbox from '../components/custom/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import {
  adminUserUpdateReset,
  getAdminUser,
  updateAdminUser,
} from '../store/slices/admin';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const AdminUserEdit = () => {
  const dispatch = useDispatch();
  const {
    adminUserData,
    userUpdated,
    adminUser: userData,
    loading,
  } = useSelector((state) => state.admin);
  const history = useNavigate();
  const { userId } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    isAdmin: false,
  });

  useEffect(() => {
    dispatch(getAdminUser(userId));
  }, [userId]);

  useEffect(() => {
    if (userData?.email) {
      setInitialValues({
        name: userData?.name,
        email: userData?.email,
        isAdmin: userData?.role === 'admin',
      });
    }
  }, [userData?.email]);

  useEffect(() => {
    if (userUpdated) {
      toast.success(`User updated!`);
      setTimeout(() => {
        dispatch(adminUserUpdateReset());
      }, 2000);
      return history(`/admin/users`);
    }
  }, [userUpdated]);

  const adminUserEditSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name must be atleast 3 characters')
      .max(30, 'Name must not exceed 30 characters')
      .trim()
      .required('Name is required')
      .defined(),
    email: yup
      .string()
      .email('Email must be a valid email')
      .lowercase()
      .required('Email is required')
      .defined(),
    isAdmin: yup.bool().defined(),
  });

  const handleSubmit = (values) => {
    const user = {
      ...values,
      _id: userId,
      role: values.isAdmin ? 'admin' : 'user',
    };
    delete user.isAdmin;
    dispatch(updateAdminUser(user));
  };

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <Formik
        validationSchema={adminUserEditSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm border-2 border-blue-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Edit User
                  </h1>

                  <TextInput
                    labelName="Name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    type="text"
                    error={errors.name}
                    placeholder="Your name"
                  />

                  <TextInput
                    labelName="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    error={errors.email}
                    placeholder="Your email"
                    disabled
                  />

                  <Checkbox labelName="Admin" name="isAdmin" />
                </div>

                <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                  {!loading ? 'Edit' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdminUserEdit;
