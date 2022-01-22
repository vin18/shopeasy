import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import Review from '../components/Review';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/product';
import ProductQuantity from '../components/ProductQuantity';
import { addProductsToCart } from '../store/slices/cart';
import toast from 'react-hot-toast';
import Reviews from '../components/Reviews';
import TextInput from '../components/custom/TextInput';
import TextArea from '../components/custom/TextArea';
import {
  fetchProductReviews,
  postProductReview,
  reviewReset,
  removeProductReview,
  updateProductReview,
} from '../store/slices/reviews';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import Loader from '../components/Loader';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [isReviewUpdate, setReviewUpdate] = useState(false);
  const [reviewToUpdate, setReviewToUpdate] = useState();
  const [rating, setRating] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const { productData: product, loading } = useSelector(
    (state) => state.product
  );

  const {
    reviewsData,
    loading: reviewLoading,
    reviewPosted,
    reviewRemoved,
    reviewUpdated,
    error: reviewError,
  } = useSelector((state) => state.reviews);

  const { userData } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId]);

  useEffect(() => {
    dispatch(reviewReset());

    if (reviewError) {
      toast.error(reviewError);
    } else if (reviewPosted) {
      toast.success(`Review posted!`);
    } else if (reviewUpdated) {
      toast.success(`Review updated!`);
    } else if (reviewRemoved) {
      toast.success(`Review removed!`);
    }

    dispatch(fetchProductReviews(productId));
    setRating('');
    setTitle('');
    setComment('');
    setReviewUpdate(false);
    setReviewUpdate(null);
  }, [reviewPosted, reviewRemoved, reviewUpdated, reviewError, productId]);

  const isProductAvailable = product.countInStock > 0;

  const handleAddToCart = () => {
    const productsData = {
      productId,
      quantity,
      name: product?.name,
      price: product?.price,
      image: product?.image,
    };
    toast.success(`Item added to the cart!`);
    dispatch(addProductsToCart(productsData));
    history(`/cart`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = { rating, title, comment };

    if (isReviewUpdate) {
      dispatch(
        updateProductReview({ ...review, reviewId: reviewToUpdate?._id })
      );
    } else {
      dispatch(postProductReview({ ...review, product: productId }));
      setReviewToUpdate(null);
      setReviewUpdate(false);
    }
  };

  const handleUpdateProductReview = (review) => {
    setRating(review?.rating);
    setTitle(review?.title);
    setComment(review?.comment);
    setReviewUpdate(true);
    setReviewToUpdate(review);
  };

  const handleDeleteProductReview = (reviewId) => {
    dispatch(removeProductReview(reviewId));
  };

  const addQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);

  const subtractQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity - 1);

  if (loading) return <Loader />;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex bg-blue-500 px-4 py-2 rounded shadow text-blue-50"
      >
        <LeftArrowIcon />
        <span className="ml-2">Back to products</span>
      </Link>

      <div className="mt-16 flex">
        <div className="flex-1">
          <img style={{ maxWidth: '450px' }} src={product.image} alt="" />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-3xl">{product.name}</h3>
          <p>Description: {product.description}</p>
          <Review product={product} /> ({product.numReviews} reviews)
          <div>Category: {capitalizeFirstLetter(product.category)}</div>
          <div>Price: ₹{product.price}</div>
          <div className="flex">
            Status: &nbsp;
            <p
              className={isProductAvailable ? 'text-green-600' : 'text-red-600'}
            >
              {isProductAvailable ? 'Available' : 'Not Available'}
            </p>
          </div>
          <div className="flex">
            <button
              onClick={addQuantity}
              className="inline-flex leading-5 font-semibold rounded-full text-blue-800"
              disabled={quantity >= product?.countInStock}
            >
              <PlusIcon />
            </button>
            <span className="mx-1">{quantity}</span>

            <button
              onClick={subtractQuantity}
              className="inline-flex leading-5 font-semibold rounded-full text-blue-800"
              disabled={quantity <= 1}
            >
              <MinusIcon />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-700 text-blue-100 py-2 px-6 rounded transition ease-out hover:bg-blue-600"
          >
            Add to cart
          </button>
        </div>
      </div>

      <div className="mt-16 w-100 flex justify-between">
        <Reviews
          productId={productId}
          reviewLoading={reviewLoading}
          reviewsData={reviewsData}
          handleUpdateProductReview={handleUpdateProductReview}
          handleDeleteProductReview={handleDeleteProductReview}
        />

        <div className="w-1/2">
          <h3 className="text-3xl mb-4">
            {isReviewUpdate ? 'Edit' : 'Write'} a review
          </h3>

          <form onSubmit={handleReviewSubmit} className="w-100">
            <p className="block mb-2 text-gray-600 font-semibold">Rating</p>
            <div>
              <select
                className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full border-2`}
                aria-label="Select a rating.."
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option selected>Select a rating..</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <br />

            <TextInput
              labelName="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Review title"
            />

            <br />

            <TextArea
              labelName="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              type="text"
              placeholder="Review comment"
            />

            {isLoggedIn ? (
              <>
                <button className="mt-4 bg-blue-500 text-indigo-100 py-2 rounded-md text-lg px-8">
                  {reviewLoading ? 'Please wait...' : 'Submit Review'}
                </button>

                {isReviewUpdate && (
                  <button
                    onClick={() => {
                      setReviewUpdate(false);
                      setReviewToUpdate(null);
                      setTitle('');
                      setComment('');
                      setRating('');
                    }}
                    className="mt-4 ml-4 border-2 border-blue-500 py-2 rounded-md text-lg px-8"
                  >
                    Cancel
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => history(`/login`)}
                className="mt-4 bg-blue-500 text-indigo-100 py-2 rounded-md text-lg px-8"
              >
                Login to review
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
