import { api } from './axios';

export const authApi = {
  signUp: (data) => api.post(`/auth/sign-up/${data.type.toLowerCase()}`, data),
  login: (data) => api.post('/auth/login', data),
};
