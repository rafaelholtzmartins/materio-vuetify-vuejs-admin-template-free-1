<template>
  <v-simple-table
    dark
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase text--primary">
            Nome
          </th>
          <th class="text-center text-uppercase text--primary">
            Apelido
          </th>
          <th class="text-center text-uppercase text--primary">
            Email
          </th>
          <th class="text-center text-uppercase text--primary">
            Telefone
          </th>
          <th class="text-center text-uppercase text--primary">
            CPF/CNPJ
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="index in clientsList"
          id="tr-hover"
          :key="index.clientsList"
          @click="clientView(index._id)"
        >
          <td>{{ index.nome }}</td>
          <td class="text-center">
            {{ index.apelido }}
          </td>
          <td class="text-center">
            {{ index.email }}
          </td>
          <td class="text-center">
            {{ index.phone }}
          </td>
          <td class="text-center">
            {{ index.cpf_cnpj }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'ListClients',
  data() {
    return {
      url: process.env.VUE_APP_ROOT_API,
      clientsList: [],
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    async getClients() {
      console.log('View > clients > ListClients')
      const authString = `Bearer ${localStorage.getItem('token')}`

      axios
        .get(`${process.env.VUE_APP_ROOT_API}/client/get`, {
          headers: { Authorization: authString },
          'Content-Type': 'multipart/form-data',
        })
        // eslint-disable-next-line arrow-parens
        .then((response) => {
          this.clientsList = response.data.clients
        })
        // eslint-disable-next-line arrow-parens
        .catch(err => {
          if (err.response.status === 401) {
            console.log(err.response.status)
            localStorage.clear()
            router.push({ name: 'pages-login' })
          }
        })
    },
    async clientView(id) {
      router.push({ path: `/viewclient/:${id}` })
    },
  },
}
</script>
<style scoped>
#tr-hover{
  cursor: pointer;
}
</style>
