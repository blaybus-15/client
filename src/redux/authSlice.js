import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

// 회원가입 요청
export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await authApi.signUp(userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 로그인 요청
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    return { accessToken, user }; // 로그인 성공 시 user 정보 함께 반환
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signupData: {},
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateSignupData: (state, action) => {
      state.signupData = { ...state.signupData, ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true; // 회원가입 후 자동 로그인할 지 로그인 페이지 이동할지에 따라 변경
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSignupData, logout } = authSlice.actions;
export default authSlice.reducer;
