import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/components/UserLogin.vue';
import UserRegister from '@/components/UserRegister.vue';
import HomePage from '@/components/HomePage.vue';
import UserProfile from '@/components/UserProfile.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';
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
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
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
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const isLoggedIn = store.isLoggedIn;
  const isAdmin = store.user && store.user.role === 'admin';

  if (requiresAuth && !isLoggedIn) {
    next('/');
  } else if (requiresAdmin && !isAdmin) {
    next('/home');
  } else {
    next();
  }
});

export default router;
