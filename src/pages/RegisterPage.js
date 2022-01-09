import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/user';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const history = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.email) {
      return history(`/`);
    }
  }, [userData]);

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
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm border-2 border-blue-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Register
                  </h1>

                  <TextInput
                    labelName="Name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    type="string"
                    error={errors.name}
                    placeholder="Your name"
                  />

                  <TextInput
                    labelName="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    type="string"
                    error={errors.email}
                    placeholder="Your email"
                  />

                  <TextInput
                    labelName="Password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type="string"
                    error={errors.password}
                    placeholder="Your password"
                  />
                </div>

                <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                  Register
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
