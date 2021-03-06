import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import TextInput from '../components/custom/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/user';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const { userData, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [initialValues, setInitialValues] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (userData?.email) {
      setInitialValues({
        address: userData?.address,
        city: userData?.city,
        postalCode: userData?.postalCode,
        country: userData?.country,
      });
    }
  }, [userData?.email]);

  const shippingSchema = yup.object().shape({
    address: yup.string().required('Address is required').trim().defined(),
    city: yup.string().required('City is required').trim().defined(),
    postalCode: yup
      .string()
      .required('Postal code is required')
      .trim()
      .defined(),
    country: yup.string().required('Country is required').trim().defined(),
  });

  const handleSubmit = (values) => {
    const userObj = {
      name: userData?.name,
      email: userData?.email,
      ...values,
    };
    dispatch(updateProfile(userObj));
    history(`/placeorder`);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-center text-3xl font-semibold text-indigo-500 mb-4">
        Shipping Address
      </h1>
      <Formik
        validationSchema={shippingSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
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
              <div className="bg-white p-5 rounded-xl w-screen shadow-lg max-w-md border-2 border-indigo-100">
                <div className="space-y-4">
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

                <button
                  className={`mt-4 w-full bg-indigo-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide ${
                    (loading || !isValid) && 'opacity-70 cursor-not-allowed'
                  }`}
                  disabled={loading || !isValid}
                >
                  {!loading ? 'Continue' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Shipping;
