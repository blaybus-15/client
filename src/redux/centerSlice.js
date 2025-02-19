import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signupData: {
        email: "",
        password: "",
        confirmPassword: "",
        centerId: 0,
        name: "",
        contactNumber: "",
        introduction: "", 
        profileImageUrl: "", // URL만 저장
      },
    };

const centerSlice = createSlice({
  name: 'center',
  initialState,
  reducers: {
    setCenterInfo: (state, action) => {
        return { ...state, signupData: { ...state.signupData, ...action.payload } };
      },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload; // 이미지 파일 저장
    },
    resetCenter: () => initialState,
  },
});

export const { setCenterInfo, setProfileImage, resetCenter } = centerSlice.actions;
export default centerSlice.reducer;