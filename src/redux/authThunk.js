import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setProfileImageUrl } from './authSlice';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 회원가입 요청
export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async ({ profileImageFile }, thunkAPI) => {
    try {
      const state = thunkAPI.getState().auth.signupData;
      const formData = new FormData();

      // ADMIN과 CAREGIVER 구분하여 요청 데이터 설정
      const requestKey =
        state.type === 'ADMIN' ? 'adminRequest' : 'signUpRequest';
      const endpoint =
        state.type === 'ADMIN' ? '/auth/sign-up/admin' : '/auth/sign-up/member';

      formData.append(
        requestKey,
        new Blob([JSON.stringify(state)], { type: 'application/json' })
      );

      if (profileImageFile) {
        formData.append('file', profileImageFile);
      }

      console.log('회원가입 요청 데이터:', state);

      const response = await axios.post(
        `${API_BASE_URL}${endpoint}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log('회원가입 성공 응답:', response.data);
      alert('회원가입이 완료되었습니다.');

      // 회원가입 성공 시 자동 로그인
      await thunkAPI.dispatch(
        signInThunk({ email: state.email, password: state.password })
      );

      // 백엔드 프로필 이미지 URL을 반환하는 경우 Redux에 저장
      if (response.data?.data?.profileImageUrl) {
        thunkAPI.dispatch(
          setProfileImageUrl(response.data.data.profileImageUrl)
        );
      }

      return response.data;
    } catch (error) {
      console.error(
        '회원가입 요청 실패:',
        error.response?.data || error.message
      );
      alert(`회원가입 실패: ${error.response?.data?.message || "알 수 없는 오류"}`);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || '회원가입 요청 실패'
      );
    }
  }
);

// 로그인 요청
export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('로그인 요청 시작');

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      console.log('로그인 성공 응답:', response.data);

      const { accessToken, refreshToken, username, roles } = response.data.data;

      // 토큰과 사용자 정보 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('email', username);
      localStorage.setItem('roles', JSON.stringify(roles));

      alert('로그인 되었습니다');

      return { accessToken, refreshToken, email: username, roles };
    } catch (error) {
      console.error('로그인 요청 실패:', error.response?.data || error.message);
      alert(`로그인 실패: ${error.response?.data?.message || "이메일 또는 비밀번호를 확인해주세요."}`);
      return rejectWithValue(
        error.response?.data?.message || '로그인 요청 실패'
      );
    }
  }
);
