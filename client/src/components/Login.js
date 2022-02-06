import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/user';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const history = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userData?.email) {
      toast.success(`Logged in!`);
      return history(`/`);
    }
  }, [userData, history]);

  const loginSchema = yup.object().shape({
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
    dispatch(login(values));
  };

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <Formik
        validationSchema={loginSchema}
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
                    Login
                  </h1>

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
                    New user?{' '}
                    <Link
                      className="hover:underline hover:text-blue-500"
                      to="/register"
                    >
                      Register here
                    </Link>
                  </p>
                </div>

                <button
                  className={`mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide ${
                    (!isValid || !dirty) && 'opacity-70 cursor-not-allowed'
                  }`}
                  disabled={!loading || !isValid || !dirty}
                >
                  {!loading ? 'Login' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
