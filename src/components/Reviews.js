import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductReviews } from '../store/slices/reviews';
import moment from 'moment';
import StarIcon from '../assets/icons/StarIcon';

const Reviews = ({ productId }) => {
  const { reviewsData, loading } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductReviews(productId));
  }, [productId]);

  if (loading) return <p>Loading...</p>;

  console.log('reviewsData', reviewsData);

  return (
    <div className="mt-32">
      <h3 className="text-3xl">Reviews</h3>

      {reviewsData?.length === 0 && (
        <p className="text-lg">
          There are currently no reviews for this product.
        </p>
      )}

      {reviewsData?.map((review) => (
        <div
          className="mt-8 shadow p-5 border border-blue-200"
          key={review._id}
        >
          <div className="flex items-center mb-2">
            <div className="inline-flex items-center bg-blue-600 text-blue-100 p-1 rounded mr-2 text-sm">
              <span>{review?.rating}</span> <StarIcon />
            </div>
            <p>{review?.title}</p>
          </div>
          <p className="text-sm">{review?.comment}</p>
          <p className="text-sm">
            Posted at {moment(review?.createdAt).format(`DD-MM-YYYY`)} by{' '}
            {review?.user?.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
