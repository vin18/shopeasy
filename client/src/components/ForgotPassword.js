import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  userReset,
  login,
  forgotPassword,
  userPasswordRequestReset,
} from '../store/slices/user';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const initialValues = {
    email: '',
  };
  const dispatch = useDispatch();
  const { passwordForgotRequestSuccess, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (passwordForgotRequestSuccess) {
      toast.success(passwordForgotRequestSuccess);
      dispatch(userPasswordRequestReset());
    }
  }, [passwordForgotRequestSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(userReset());
    }
  }, [error]);

  const forgotPasswordSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email')
      .lowercase()
      .required('Email is required')
      .defined(),
  });

  const handleSubmit = (values) => {
    dispatch(forgotPassword(values));
  };

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <Formik
        validationSchema={forgotPasswordSchema}
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
        }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-lg max-w-sm border-2 border-blue-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-blue-500">
                    Forgot Password
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
                </div>

                <button
                  className={`mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide ${
                    (loading || !isValid) && 'opacity-70 cursor-not-allowed'
                  }`}
                  disabled={loading || !isValid}
                >
                  {!loading ? 'Submit' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
