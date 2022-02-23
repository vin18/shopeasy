import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from './custom/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, userReset } from '../store/slices/user';
import toast from 'react-hot-toast';

const ProfileForm = () => {
  const { userData, loading, isUserUpdated } = useSelector(
    (state) => state.user
  );
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

  useEffect(() => {
    if (isUserUpdated) {
      toast.success(`User profile updated!`);
      dispatch(userReset());
    }
  }, [isUserUpdated]);

  const handleSubmit = (values) => {
    dispatch(updateProfile(values));
  };

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-lg max-w-sm border-2 border-indigo-100">
                <div className="space-y-4">
                  <h1 className="text-center text-2xl font-semibold text-indigo-500">
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

                <button className="mt-4 w-full bg-indigo-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
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
