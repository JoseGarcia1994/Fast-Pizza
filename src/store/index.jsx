import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice.js';
import cartReducer from './slices/cart.slice.js';

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
	}
})