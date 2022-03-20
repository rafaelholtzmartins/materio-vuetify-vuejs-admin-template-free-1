export default function beforeEnter(_to, _from, next) {
  const token = JSON.parse(localStorage.getItem('token'))
  if (!token) {
    next('/pages/login')
  } else {
    next()

    /* const authString = `Bearer ${token}`
    fetch('http://localhost:5000/user/checkusertoken', {
      method: 'POST',
      headers: { Authorization: authString },
    }).then(response => response.json().then(data => ({
      data,
      status: response.status,
    })).then(res => {
      // console.log(/* res.status, res.data.message,  res.data)
      if (res.status === 400) {
        localStorage.clear()
        next('/pages/login')
      } else {
        next()
      }
    })) */
  }
}
