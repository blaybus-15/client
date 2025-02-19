import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import caregiverProfileReducer from './profile/caregiverProfileSlice';
import seniorStepReducer from './profile/seniorStepSlice';
import seniorReducer from './seniorSlice';
import caregiverReducer from './caregiverSlice';
import centerReducer from './centerSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    caregiver: caregiverReducer,
    senior: seniorReducer,
    center: centerReducer,
    admin: adminReducer,
    caregiverProfile: caregiverProfileReducer,
    seniorStep: seniorStepReducer,
  },
});

export default store;
