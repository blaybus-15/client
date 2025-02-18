import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import caregiverProfileReducer from './profile/caregiverProfileSlice';
import seniorReducer from './seniorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    senior: seniorReducer,
    caregiverProfile: caregiverProfileReducer,
  },
});

export default store;
