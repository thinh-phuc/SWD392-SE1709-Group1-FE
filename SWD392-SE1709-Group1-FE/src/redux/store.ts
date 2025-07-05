import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import orderReducer from './order.slice';
import { useDispatch } from 'react-redux';
import blogReducer from './blog.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    blog: blogReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
