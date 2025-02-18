import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import caregiverProfileReducer from './profile/caregiverProfileSlice';
import seniorStepReducer from './profile/seniorStepSlice';
import seniorReducer from './seniorSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    senior: seniorReducer,
    caregiverProfile: caregiverProfileReducer,
    seniorStep: seniorStepReducer,
  },
});

export default store;
