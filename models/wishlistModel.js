import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: 'Product',
      default: null,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      default: null,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

wishlistSchema.index({ product: 1, user: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
