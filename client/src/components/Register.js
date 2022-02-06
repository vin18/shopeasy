import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../store/slices/user';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const history = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userData?.email) {
      toast.success(`Registered successfully!`);
      return history(`/`);
    }
  }, [userData, history]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  const registerSchema = yup.object().shape({
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
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(150)
      .required('Password is required')
      .defined(),
  });

  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <Formik
        validationSchema={registerSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          setFieldValue,
          isValid,
          dirty,
        }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-lg max-w-sm border-2 border-blue-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-blue-500">
                    Register
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
                    type="text"
                    error={errors.email}
                    placeholder="Your email"
                  />

                  <TextInput
                    labelName="Password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    error={errors.password}
                    placeholder="Your password"
                    isPasswordInput
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>

                <div className="flex mt-4">
                  <p className="block text-gray-600 font-semibold mr-2">
                    Already a user?{' '}
                    <Link
                      className="hover:underline hover:text-blue-500"
                      to="/login"
                    >
                      Login here
                    </Link>
                  </p>
                </div>

                <button
                  className={`mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide ${
                    (loading || !isValid || !dirty) &&
                    'opacity-70 cursor-not-allowed'
                  }`}
                  disabled={loading || !isValid || !dirty}
                >
                  {!loading ? 'Register' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;