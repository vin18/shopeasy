import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  products: [
    {
      productId: String,
      quantity: Number,
      name: String,
      price: Number,
      image: String,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
