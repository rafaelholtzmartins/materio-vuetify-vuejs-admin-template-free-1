<template>
  <v-row>
    <!-- dark -->
    <v-col cols="12">
      <v-card>
        <v-card-title>Dark</v-card-title>
        <v-card-text>
          Use <code>dark</code> prop to switch table to the dark theme.
        </v-card-text>
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
