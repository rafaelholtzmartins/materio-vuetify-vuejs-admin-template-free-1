<template>
  <v-row>
    <!-- dark -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Dark</v-card-title>
        <v-card-text>
          Use <code>dark</code> prop to switch table to the dark theme.
        </v-card-text>
        <TableDark />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

// import axios from 'axios'
import clientsGetAll from '../../utils/ClientsGetAll'
import TableDark from '../simple-table/demos/DemoSimpleTableDark.vue'

export default {
  name: 'Clients',
  components: {
    TableDark,
  },
  data() {
    return {
      result: [],
      url: process.env.VUE_APP_ROOT_API,
    }
  },
  mounted() {
    this.getClients()
    console.log(`aqui ${this.url}`)
  },
  methods: {
    async getClients() {
      clientsGetAll()

      /* const token = localStorage.getItem('token')
      const tokenParse = JSON.parse(token)
      const authString = `Bearer ${tokenParse}`
      axios
        .get('http://localhost:5000/client/get',
          { headers: { Authorization: authString } })
        .then(response => {
          console.log(response)
          this.result = response.data
        })
        .catch(error => {
          console.log(error)
        })
      console.log(this.result) */
    },
  },
}
</script>
