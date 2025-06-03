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
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
