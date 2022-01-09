import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from './custom/TextInput';

const ProfileForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const profileSchema = yup.object().shape({
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
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  const handleSubmit = (values) => {};

  return (
    <div className="flex justify-center items-center w-full mt-24">
      <Formik
        validationSchema={profileSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm border-2 border-blue-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-gray-600">
                    Update Profile
                  </h1>

                  <TextInput
                    labelName="Name"
                    value={values.name}
                    onChange={handleChange}
                    name="text"
                    type="string"
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
                  />

                  <TextInput
                    labelName="Password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                    error={errors.password}
                    placeholder="Your password"
                  />

                  <TextInput
                    labelName="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword}
                    placeholder="Confirm password"
                  />
                </div>

                <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                  Update profile
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileForm;
