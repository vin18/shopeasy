import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productsReducer from './slices/products';

const reducer = combineReducers({
  products: productsReducer,
});

const store = configureStore({
  reducer,
});

export default store;
