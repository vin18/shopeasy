import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MinusIcon from '../assets/icons/MinusIcon';
import PlusIcon from '../assets/icons/PlusIcon';
import { addProductsToCart } from '../store/slices/cart';

const ProductQuantity = ({
  quantity = 1,
  setQuantity,
  countInStock = 0,
  handleAddToCart,
}) => {
  const addQuantity = () => setQuantity((prevQuantity) => prevQuantity + 1);
  const subtractQuantity = () =>
    setQuantity((prevQuantity) => prevQuantity - 1);

  return (
    <div className="flex">
      <button
        onClick={addQuantity}
        className="inline-flex leading-5 font-semibold rounded-full text-blue-800"
        disabled={quantity >= countInStock}
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
  );
};

export default ProductQuantity;
