import { productApi } from './axiosConfig';

export const fetchProducts = ()   => productApi.get('/products').then(r => r.data);
export const fetchProduct  = (id) => productApi.get(`/products/${id}`).then(r => r.data);
export const seedProducts  = ()   => productApi.post('/products/fetch').then(r => r.data);