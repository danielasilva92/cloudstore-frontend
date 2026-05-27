import { userApi } from './axiosConfig';

export const createOrder = (data) => userApi.post('/api/orders', data).then(r => r.data);
export const fetchOrders = ()     => userApi.get('/api/orders').then(r => r.data);