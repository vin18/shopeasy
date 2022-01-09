import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productsReducer from './slices/products';
import productReducer from './slices/product';
import cartReducer from './slices/cart';

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer,
});

export default store;
