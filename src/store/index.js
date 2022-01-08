import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productsReducer from './slices/products';
import productReducer from './slices/product';

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;
