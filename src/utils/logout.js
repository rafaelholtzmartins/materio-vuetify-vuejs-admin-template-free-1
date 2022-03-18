import router from '@/router/index'

export default function logout() {
  console.log('logout')
  localStorage.clear()
  router.push({ name: 'pages-login' })
}
