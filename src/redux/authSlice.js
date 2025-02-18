import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

// 회원가입 요청
export const signUp = createAsyncThunk('auth/signUp', async (_, { getState, rejectWithValue }) => {
  try {
    const signupData = getState().auth.signupData;
    console.log("회원가입 요청 데이터:", signupData);

    const response = await authApi.signUp(signupData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// 로그인 요청
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    const { accessToken, refreshToken, username, email, roles } = response.data.data;

    // 토큰 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    return { accessToken, user: { username, email, roles } };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "로그인 실패");
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signupData: {
      type: "",  // 첫 화면에서 선택한 userType 저장 (CAREGIVER / ADMIN)
      name: "",
      genderType: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    user: null, // 로그인 후 사용자 정보 저장
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSignupField: (state, action) => {
      const { field, value } = action.payload;
      state.signupData[field] = value;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSignupField, logout } = authSlice.actions;
export default authSlice.reducer;
