import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/Slices/UserSlice';
import productsReducer from '../store/Slices/ProductsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer
  },
})