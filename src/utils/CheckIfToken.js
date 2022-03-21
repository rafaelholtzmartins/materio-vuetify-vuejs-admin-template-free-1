// eslint-disable-next-line import/no-cycle

export default function beforeEnter(to, from, next) {
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('checkiftoken')

  if (!token) {
    // router.push({ name: 'pages-login' })
    next({ path: '/pages/login' })
  } else if (token) {
    console.log('Tem token')
    console.log(token)
    console.log(to)
    console.log(from)

    next({ path: '/pages/login' })
  }
}
