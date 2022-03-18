export default function beforeEnter(_to, _from, next) {
  const token = JSON.parse(localStorage.getItem('token'))
  if (!token) {
    next('/pages/login')
  } else {
    const tokenJson = JSON.stringify({ token })
    fetch('http://localhost:5000/user/checkusertoken', {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: tokenJson,
    }).then(response => response.json().then(data => ({
      data,
      status: response.status,
    })).then(res => {
      // console.log(/* res.status, res.data.message, */ res.data)
      if (res.status === 400) {
        localStorage.clear()
        next('/pages/login')
      } else if (res.status === 200) {
        next()
      } else {
        next('/pages/login')
      }
    }))
  }
}
