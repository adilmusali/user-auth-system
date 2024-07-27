import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/components/UserLogin.vue'; // Adjust the path as needed
import HomePage from '@/components/HomePage.vue';  // Create a HomePage component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
