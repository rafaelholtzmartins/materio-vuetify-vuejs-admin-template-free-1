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
import TableDark from '../simple-table/demos/DemoSimpleTableDark.vue'

export default {
  name: 'Vehicles',
  components: {
    TableDark,
  },
}
</script>
