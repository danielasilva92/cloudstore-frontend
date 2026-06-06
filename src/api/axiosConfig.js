import axios from 'axios';

export const userApi = axios.create({
  baseURL: process.env.REACT_APP_USER_URL || 'http://localhost:8081',
});

export const productApi = axios.create({
  baseURL: process.env.REACT_APP_PRODUCT_URL || 'http://localhost:5000',
});

const attachToken = (config) => {
  const token = localStorage.getItem('cs_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

userApi.interceptors.request.use(attachToken);
productApi.interceptors.request.use(attachToken);

userApi.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cs_token');
      localStorage.removeItem('cs_user');
     
    }
    return Promise.reject(err);
  }
);