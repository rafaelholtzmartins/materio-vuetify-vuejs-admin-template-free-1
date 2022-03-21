import router from '@/router/index'

export default function logout() {
  const token = localStorage.getItem('token')
  const tokenJson = JSON.stringify({ token })
  fetch(`${process.env.VUE_APP_ROOT_API}/user/logout`, {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: tokenJson,
  }).then(response => response.json().then(data => ({
    data,
    status: response.status,
  })).then(res => {
    console.log(res)
  }))
  localStorage.clear()
  router.push({ name: 'pages-login' })
}
