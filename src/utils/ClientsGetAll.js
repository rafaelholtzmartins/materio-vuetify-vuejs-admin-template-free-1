import axios from 'axios'

export default function clientsGetAll() {
  console.log('clientsGetAll')
  const token = localStorage.getItem('token')
  const tokenParse = JSON.parse(token)
  const authString = `Bearer ${tokenParse}`
  axios
    .get('http://localhost:5000/client/get',
      {
        headers: { Authorization: authString },
        'Content-Type': 'multipart/form-data',
      })
    .then(response => {
      console.log(response.data)

      return response.data

      // res.status(response.)
      // result = response.data
    })
    .catch(error => {
      console.log(error)
    })
}
