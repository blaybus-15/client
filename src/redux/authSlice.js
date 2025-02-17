import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

// 회원가입 요청
export const signUp = createAsyncThunk('auth/signUp', async (_, { getState, rejectWithValue }) => {
  try {
    const signupData = getState().auth.signupData;
    console.log("회원가입 요청 데이터:", cleanedData);

    const response = await authApi.signUp(cleanedData);
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
    signupData: {
      type: "",  // 첫 화면에서 선택한 userType 저장 (CAREGIVER / ADMIN)
      name: "",
      genderType: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    user: null,
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

export const { setSignupField, logout } = authSlice.actions;
export default authSlice.reducer;
