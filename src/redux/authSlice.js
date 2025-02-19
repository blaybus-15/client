import { createSlice } from '@reduxjs/toolkit';
import { signInThunk, signUpThunk } from './authThunk';

const initialState = {
  role: "", // "CAREGIVER" or "ADMIN"
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload; // role 저장
    },
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "";
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입 API 요청 (성공 시 자동 로그인)
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      
        const { accessToken, refreshToken, roles } = action.payload.data; // 로그인 응답에서 받아온 데이터
      
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      
        if (roles?.length > 0) {
          state.role = roles[0].replace("ROLE_", ""); 
          localStorage.setItem("role", state.role);
        }
      
        console.log("자동 로그인 성공, Redux 상태 업데이트 완료:", state);
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '회원가입 요청 실패';
      })

      // 로그인 API 요청
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        
        const { accessToken, refreshToken, roles } = action.payload.data;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        if (roles?.length > 0) {
          state.role = roles[0].replace("ROLE_", "");
          localStorage.setItem("role", state.role);
        }

        console.log("로그인 후 Redux에 저장된 role:", state.role);
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '로그인 요청 실패';
      });
  },
});

export const { setRole, setAuthStatus, logout } = authSlice.actions;
export default authSlice.reducer;