import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
  const { data } = await authApi.signUp(userData);
  return data;
});

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await authApi.login(credentials);
  localStorage.setItem('accessToken', data.data.accessToken);
  return data.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
