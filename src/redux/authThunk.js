import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setProfileImageUrl } from './caregiverSlice';
import { setProfileImageUrl as setCenterProfileImage } from './adminSlice';
import { setAuthStatus } from './authSlice';
import { API_BASE_URL } from '../config';

const formatUrl = (base, path) => {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async ({ profileImageFile, userType }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const role = userType || state.auth.role; 

      let signupData = role === "CAREGIVER" ? state.caregiver.signupData : state.admin.signupData;
      let requestKey = role === "CAREGIVER" ? "signUpRequest" : "adminRequest";
      let endpoint = role === "CAREGIVER" ? "/auth/sign-up/member" : "/auth/sign-up/admin";

      const formData = new FormData();
      formData.append(requestKey, new Blob([JSON.stringify(signupData)], { type: "application/json" }));
      if (profileImageFile) formData.append("file", profileImageFile);

      console.log("회원가입 요청 데이터:", signupData);

      const finalUrl = formatUrl(API_BASE_URL, endpoint);

      // 1) 회원가입 API 요청
      const response = await axios.post(finalUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("회원가입 성공 응답:", response.data);
      alert("회원가입이 완료되었습니다.");

      // 2) 회원가입 후 자동 로그인 실행 (unwrap() 사용)
      const loginResponse = await thunkAPI.dispatch(
        signInThunk({ email: signupData.email, password: signupData.password })
      ).unwrap(); // `unwrap()`을 사용해야 `fulfilled`에서 처리 가능

      console.log("자동 로그인 응답:", loginResponse);

      return loginResponse; // 로그인 성공 후 응답을 반환하여 Redux에 저장 가능하도록 함
    } catch (error) {
      console.error("회원가입 요청 실패:", error.response?.data || error.message);
      alert(`${error.response?.data?.message || "회원가입에 실패했습니다."}`);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "회원가입 요청 실패");
    }
  }
);

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const finalUrl = formatUrl(API_BASE_URL, "/auth/login");

      const response = await axios.post(finalUrl, { email, password });

      console.log("로그인 성공 응답:", response.data);
      alert("로그인 되었습니다.");

      // 로그인 성공 시, 토큰과 역할(role) 저장
      const { accessToken, refreshToken, roles, username } = response.data.data;

      if (!accessToken || !refreshToken || !roles || roles.length === 0) {
        throw new Error("토큰 또는 역할 정보가 없습니다.");
      }

      // role 변환 (ROLE_CAREGIVER -> CAREGIVER, ROLE_ADMIN -> ADMIN)
      const role = roles[0].replace("ROLE_", "");
      thunkAPI.dispatch(setAuthStatus({ isAuthenticated: true, role, accessToken }));

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      return { data: { accessToken, refreshToken, roles }};
    } catch (error) {
      console.error("로그인 요청 실패:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "로그인 요청 실패");
    }
  }
);