import axios from 'axios';
import store from './store';
import router from './router';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

api.interceptors.request.use(config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === '/auth/refresh') {
        // This means the refresh token is invalid, so logout
        store.logout();
        router.push('/');
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark that we've retried this request

      try {
        // Attempt to refresh the token
        const { data } = await api.post('/auth/refresh');
        setAccessToken(data.accessToken); // Store the new token
        
        // Update the header of the original request and retry it
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If the refresh fails, log the user out
        console.error('Session expired. Please log in again.');
        store.logout(); // Update the auth state
        router.push('/'); // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;