import { userApi } from './axiosConfig';

export const register = (data) => userApi.post('/api/auth/register', data).then(r => r.data);
export const login    = (data) => userApi.post('/api/auth/login', data).then(r => r.data);