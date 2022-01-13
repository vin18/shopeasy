import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productsReducer from './slices/products';
import productReducer from './slices/product';
import cartReducer from './slices/cart';
import userReducer from './slices/user';
import ordersReducer from './slices/orders';

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  orders: ordersReducer,
});

const store = configureStore({
  reducer,
});

export default store;
