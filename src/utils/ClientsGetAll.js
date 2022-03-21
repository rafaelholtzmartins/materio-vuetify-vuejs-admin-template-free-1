import axios from 'axios'

export default function clientsGetAll() {
  console.log('clientsGetAll')
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
    .catch(error => {
      console.log(error)
    })
}
