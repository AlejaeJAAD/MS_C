import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend URL
  withCredentials: true
});

// api.interceptors.request.use(config => {
//   const refreshToken = getRefreshTokenFromCookie();
//   if (refreshToken) {
//       config.headers.Authorization = `Bearer ${refreshToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   response => response,
//   async error => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           const refreshToken = getRefreshTokenFromCookie();
//           if (refreshToken) {
//               try {
//                   const { data } = await api.post('/auth/refreshToken');
//                   console.log(data)
//                   setRefreshTokenCookie(data.token);
//                   return api(originalRequest);
//               } catch (error) {
//                   // handle refresh token error
//               }
//           }
//       }
//       return Promise.reject(error);
//   }
// );

// const getRefreshTokenFromCookie = () => {
//   const cookie = document.cookie.split('; ').find(c => c.startsWith('refreshToken='));
//   if (cookie) {
//       return cookie.split('=')[1];
//   }
// };

// const setRefreshTokenCookie = refreshToken => {
//   document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; SameSite=Strict`;
// };

export default api;
