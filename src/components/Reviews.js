import { useEffect } from 'react';
import { fetchProductReviews } from '../store/slices/reviews';
import moment from 'moment';
import StarIcon from '../assets/icons/StarIcon';
import { FaTrash } from 'react-icons/fa';

const Reviews = ({
  productId,
  reviewsData,
  reviewLoading,
  handleDeleteProductReview,
}) => {
  if (reviewLoading) return <p>Loading...</p>;

  return (
    <div className="w-1/2 mr-16">
      <h3 className="text-3xl">Reviews</h3>
      {reviewsData?.length === 0 && (
        <p className="text-lg">
          There are currently no reviews for this product.
        </p>
      )}
      {reviewsData?.map((review) => (
        <div
          className="mt-7 flex justify-between items-center shadow p-5 border border-blue-200"
          key={review._id}
        >
          <div>
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
          <FaTrash
            className="mr-1 text-lg text-blue-500"
            onClick={() => handleDeleteProductReview(review._id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Reviews;
