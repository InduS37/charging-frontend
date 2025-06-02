import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginPage.vue';
import Dashboard from '../views/DashboardValue.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'DashboardValue',
    component: Dashboard,
    meta: { requiresAuth: true } // 🔐 protect this route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔒 Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
