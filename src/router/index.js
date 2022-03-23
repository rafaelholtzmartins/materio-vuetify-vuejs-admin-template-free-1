import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'pages-login',
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/clients/Clients.vue'),
  },
  {
    path: '/viewclient/:id?',
    name: 'view-client',
    component: () => import('@/views/clients/ViewClient.vue'),
  },
  {
    path: '/newclient',
    name: 'new-client',
    component: () => import('@/views/clients/NewClient.vue'),
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import('@/views/vehicles/Vehicles.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
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
    redirect: '/pages/login',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') && (from.path === '/pages/login' && to.path === '/dashboard')) {
    // console.log('tem token vem do login vai para dashboard')

    next()
  } else if (!localStorage.getItem('token') && (to.path !== '/pages/login' && to.path !== '/pages/register')) {
    // console.log('não tem token e não é login ou register')
    next('/pages/login')
  } else if (localStorage.getItem('token') && (to.path !== '/pages/login' && to.path !== '/pages/register')) {
    // console.log('tem token não é login e register')
    const authString = `Bearer ${localStorage.getItem('token')}`
    axios
      .get(`${process.env.VUE_APP_ROOT_API}/session/checksessiontoken`,
        {
          headers: { Authorization: authString },
          'Content-Type': 'multipart/form-data',
        })
      .then(response => {
        if (response.data.message === 'Sessão válida') {
          // console.log(response.data.message)
          next()
        } else {
          // console.log('Token inválido')
          localStorage.clear()
          next('/pages/login')
        }
      })
      .catch(error => {
        console.log('error')
        console.log(error)
        console.log(error.data)
      })
    next()
  } else if (localStorage.getItem('token') && (to.path === '/pages/login' || to.path === '/pages/register')) {
    // console.log('tem token e é login ou register ')
    next('/dashboard')
  }
  next()
})

export default router
