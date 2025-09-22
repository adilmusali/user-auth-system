import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/components/UserLogin.vue';
import UserRegister from '@/components/UserRegister.vue';
import HomePage from '@/components/HomePage.vue';
import store from '../store';
import EmailVerification from '@/components/EmailVerification.vue';

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/verify-email',
    name: 'EmailVerification',
    component: EmailVerification,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
