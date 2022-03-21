import axios from 'axios'
import router from '@/router/index'

export default function clientsGetAll() {
  console.log('Front > utils > clientsGetAll')
  const authString = `Bearer ${localStorage.getItem('token')}`
  axios
    .get(`${process.env.VUE_APP_ROOT_API}/client/get`,
      {
        headers: { Authorization: authString },
        'Content-Type': 'multipart/form-data',
      })
    .then(response => {
      console.log(response.data)
    })
    // eslint-disable-next-line arrow-parens
    .catch((err) => {
      if (err.response.status === 401) {
        console.log(err.response.status)
        localStorage.clear()
        router.push({ name: 'pages-login' })
      }
    })
}
