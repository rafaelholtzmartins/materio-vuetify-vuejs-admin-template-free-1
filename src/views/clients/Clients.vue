<template>
  <h1>Clients</h1>
</template>
<script>
export default {
  name: 'Clients',
  mounted() {
    this.getClients()
  },
  methods: {
    async getClients() {
      console.log('getclients')
      const token = localStorage.getItem('token')
      console.log(token)
      const tokenJson = JSON.stringify({ token })
      await fetch('http://localhost:5000/client/get', {
        method: 'GET',
        headers: { 'content-Type': 'application/json' },
        body: tokenJson,
      }).then(response => response.json().then(data => ({
        data,
        status: response.status,
      })).then(res => {
        console.log(res)
      }))
    },
  },
}
</script>
