import mongoose from 'mongoose';

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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
  // match: { rating: 5 },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
