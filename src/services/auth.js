import { api } from './axios';

export const authApi = {
  signUp: (data) => {
    console.log("회원가입 요청 데이터:", data);  // 요청 바디 확인
    return api.post('/auth/sign-up', data);
  },
  login: (data) => api.post('/auth/login', data),
};
