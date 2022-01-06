import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      rating: Number,
      comment: String,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'A product must have a image'],
    },
    countInStock: {
      type: Number,
      required: [true, 'A product must have count in stock'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
    },
    brand: {
      type: String,
      required: [true, 'A product must have a brand'],
    },
    rating: Number,
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
