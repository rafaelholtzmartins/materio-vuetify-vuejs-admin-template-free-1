import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeEnter from '@/utils/CheckIfToken'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'pages-login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter,
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    beforeEnter,
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    beforeEnter,
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    beforeEnter,
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    beforeEnter,
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    beforeEnter,
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    beforeEnter,
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    beforeEnter,
    component: () => import('@/views/clients/Clients.vue'),
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    beforeEnter,
    component: () => import('@/views/vehicles/Vehicles.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    beforeEnter(_to, _from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next('/dashboard')
      } else {
        next()
      }
    },
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    beforeEnter(_to, _from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next('/dashboard')
      } else {
        next()
      }
    },
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'dashboard',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
