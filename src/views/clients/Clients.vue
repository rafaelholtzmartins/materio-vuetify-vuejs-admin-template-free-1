<template>
  <v-row>
    <!-- dark -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Clientes</v-card-title>
        <ListClients />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>

// import axios from 'axios'
import ListClients from './ListClients.vue'

export default {
  name: 'Clients',
  components: {
    ListClients,
  },
}
</script>
