import { createSlice } from '@reduxjs/toolkit';
import { signUpThunk, signInThunk } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signupData: {
      type: '', // ADMIN or CAREGIVER
      email: '',
      password: '',
      confirmPassword: '',
      profileImageUrl: '', // URL 저장
      contactNumber: '',
      name: '',
      genderType: '',
      centerId: '',
      centerName: '',
      centerAddress: '',
      hasBathVehicle: false,
      introduction: '',
    },
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSignupField: (state, action) => {
      const { field, value } = action.payload;
      state.signupData[field] = value;
    },
    setProfileImageUrl: (state, action) => {
      state.signupData.profileImageUrl = action.payload; // URL 저장
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      localStorage.removeItem('roles');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // 회원가입 후 자동 로그인
        state.signupData.profileImageUrl =
          action.payload?.data?.profileImageUrl || ''; // 프로필 이미지 URL 저장

        if (action.payload?.data?.accessToken) {
          localStorage.setItem('accessToken', action.payload.data.accessToken);
          localStorage.setItem(
            'refreshToken',
            action.payload.data.refreshToken
          );
        }
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '회원가입 요청 실패';
      })

      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;

        // 토큰 저장
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '로그인 요청 실패';
      });
  },
});

export const { setSignupField, setProfileImageUrl, logout } = authSlice.actions;
export default authSlice.reducer;
