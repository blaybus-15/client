import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signupData: {
    email: '',
    password: '',
    confirmPassword: '',
    genderType: '',
    name: '',
    contactNumber: '',
    profileImageUrl: '', // Redux에는 URL만 저장
  },
};

const caregiverSlice = createSlice({
  name: 'caregiver',
  initialState,
  reducers: {
    setCaregiverField: (state, action) => {
      const { field, value } = action.payload;
      state.signupData[field] = value;
    },
    setProfileImageUrl: (state, action) => {
      state.signupData.profileImageUrl = action.payload; // URL만 저장
    },
    resetCaregiverSignup: () => initialState, // 초기화
  },
});

export const { setCaregiverField, setProfileImageUrl, resetCaregiverSignup } = caregiverSlice.actions;
export default caregiverSlice.reducer;