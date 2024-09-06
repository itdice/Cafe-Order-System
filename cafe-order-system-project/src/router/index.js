import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      // Order Part
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/order/MainView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/order/ListView.vue')
    },
    {
      path: '/orders/:id',
      name: 'orders-detail',
      component: () => import('@/views/order/DetailView.vue')
    },
    {
      path: '/orders/select',
      name: 'orders-menu-select',
      component: () => import('@/views/order/SelectView.vue')
    },
    {
      path: '/orders/register',
      name: 'orders-register-update',
      component: () => import('@/views/order/RegisterView.vue')
    },

      // Admin Part
    {
      path: '/admin/home',
      name: 'menus-home',
      component: () => import('@/views/admin-menu/MainView.vue')
    },
    {
      path: '/admin/menus',
      name: 'menus',
      component: () => import('@/views/admin-menu/ListView.vue')
    },
    {
      path: '/admin/menus/:id',
      name: 'menus-detail',
      component: () => import('@/views/admin-menu/DetailView.vue')
    },
    {
      path: '/admin/menus/register',
      name: 'menus-register',
      component: () => import('@/views/admin-menu/RegisterView.vue')
    },
    {
      path: '/admin/menus/register/:id',
      name: 'menus-update',
      component: () => import('@/views/admin-menu/RegisterView.vue')
    }
  ]
})

export default router
