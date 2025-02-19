import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signupData: {
    email: '',
    password: '',
    confirmPassword: '',
    centerId: '',
    name: '',
    address: '',
    contactNumber: '',
    introduction: '',
    hasBathVehicle: '',
    profileImageUrl: '', // Redux에는 파일 저장 불가, URL만 저장
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminField: (state, action) => {
      const { field, value } = action.payload;
      state.signupData[field] = value;
    },
    setProfileImageUrl: (state, action) => {
      state.signupData.profileImageUrl = action.payload; // URL만 저장
    },
    resetAdminSignup: () => initialState, // 초기화
  },
});

export const { setAdminField, setProfileImageUrl, resetAdminSignup } = adminSlice.actions;
export default adminSlice.reducer;