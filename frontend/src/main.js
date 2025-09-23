import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api, { setAccessToken } from './api';
import './assets/main.css';

async function initializeApp() {
  try {
    const { data } = await api.post('/auth/refresh');
    setAccessToken(data.accessToken);
    
    const userResponse = await api.get('/users/me');
    store.login(userResponse.data);
    
  } catch (error) {
    console.log('No active session found.');
  }

  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

initializeApp();