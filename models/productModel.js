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
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
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
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
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
});

productSchema.virtual('wishlist', {
  ref: 'Wishlist',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
});

productSchema.pre('remove', async function (next) {
  await this.model('Review').deleteMany({ product: this._id });
  await this.model('Wishlist').deleteMany({ product: this._id });
});

const Product = mongoose.model('Product', productSchema);
export default Product;
