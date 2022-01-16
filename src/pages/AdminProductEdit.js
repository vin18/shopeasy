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
import {
  adminProductUpdateReset,
  fetchAdminProduct,
  updateAdminProduct,
} from '../store/slices/product';
import TextArea from '../components/custom/TextArea';

const AdminProductEdit = () => {
  const dispatch = useDispatch();
  const {
    productAdminData: product,
    productUpdated,
    loading,
  } = useSelector((state) => state.product);
  const history = useNavigate();
  const { productId } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    countInStock: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchAdminProduct(productId));
  }, [productId]);

  useEffect(() => {
    if (product) {
      setInitialValues({
        ...product,
      });
    }
  }, [product]);

  useEffect(() => {
    if (productUpdated) {
      toast.success(`Product updated!`);
      dispatch(adminProductUpdateReset());
    }
  }, [productUpdated]);

  const adminProductEditSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Name must be atleast 3 characters')
      .max(30, 'Name must not exceed 30 characters')
      .trim()
      .required('Name is required')
      .defined(),
    price: yup.string().trim().required('Price is required').defined(),
    image: yup.string().trim().required('Image is required').defined(),
    brand: yup.string().trim().required('Brand is required').defined(),
    countInStock: yup
      .string()
      .trim()
      .required('Count in stock is required')
      .defined(),
    category: yup.string().trim().required('Category is required').defined(),
    description: yup
      .string()
      .trim()
      .required('Description is required')
      .defined(),
  });

  const handleSubmit = (values) => {
    dispatch(updateAdminProduct(values));
  };

  return (
    <div className="flex justify-center items-center w-full mt-8">
      <Formik
        validationSchema={adminProductEditSchema}
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
                    Edit Product
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
                    labelName="Price"
                    value={values.price}
                    onChange={handleChange}
                    name="price"
                    type="text"
                    error={errors.price}
                    placeholder="Product price"
                  />

                  <TextInput
                    labelName="Brand"
                    value={values.brand}
                    onChange={handleChange}
                    name="brand"
                    type="text"
                    error={errors.brand}
                    placeholder="Product brand"
                  />

                  <TextInput
                    labelName="Stock"
                    value={values.countInStock}
                    onChange={handleChange}
                    name="countInStock"
                    type="text"
                    error={errors.countInStock}
                    placeholder="Product stock"
                  />

                  <TextInput
                    labelName="Category"
                    value={values.category}
                    onChange={handleChange}
                    name="category"
                    type="text"
                    error={errors.category}
                    placeholder="Product category"
                  />

                  <TextArea
                    labelName="Description"
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    type="textarea"
                    error={errors.description}
                    placeholder="Product description"
                  />
                </div>

                <button className="mt-4 w-full bg-blue-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide">
                  {!loading ? 'Update' : 'Please wait..'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AdminProductEdit;
