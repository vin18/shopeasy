import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from './custom/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/user';

const ProfileForm = () => {
  const { userData, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (userData?.email) {
      setInitialValues({
        name: userData?.name,
        email: userData?.email,
        address: userData?.address,
        city: userData?.city,
        postalCode: userData?.postalCode,
        country: userData?.country,
      });
    }
  }, [userData?.email]);

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
    address: yup.string().trim().defined(),
    city: yup.string().trim().defined(),
    postalCode: yup.string().trim().defined(),
    country: yup.string().trim().defined(),
  });

  const handleSubmit = (values) => {
    dispatch(updateProfile(values));
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <Formik
        validationSchema={profileSchema}
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
                    Update Profile
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

                  <TextInput
                    labelName="Address"
                    value={values.address}
                    onChange={handleChange}
                    name="address"
                    type="text"
                    error={errors.address}
                    placeholder="Your address"
                  />

                  <TextInput
                    labelName="City"
                    value={values.city}
                    onChange={handleChange}
                    name="city"
                    type="text"
                    error={errors.city}
                    placeholder="Your city"
                  />

                  <TextInput
                    labelName="Postal Code"
                    value={values.postalCode}
                    onChange={handleChange}
                    name="postalCode"
                    type="text"
                    error={errors.postalCode}
                    placeholder="Your postal code"
                  />

                  <TextInput
                    labelName="Country"
                    value={values.country}
                    onChange={handleChange}
                    name="country"
                    type="text"
                    error={errors.country}
                    placeholder="Your country"
                  />
                </div>

                <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                  {!loading ? 'Update profile' : 'Please wait..'}
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
