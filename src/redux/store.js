import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import caregiverProfileReducer from './profile/caregiverProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    caregiverProfile: caregiverProfileReducer,
  },
});

export default store;
