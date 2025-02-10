import { api } from './axios';

export const authApi = {
  signUp: (data) => api.post('/auth/sign-up', data),
  login: (data) => api.post('/auth/login', data),
};
