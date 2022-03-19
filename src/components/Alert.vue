<template>
  <div class="message-container">
    <p>{{ msg }}</p>
  </div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    msg: String,
  },
}
</script>

<style scoped>
.message-container {
  color: #b8daff;
  background-color: #ff4141;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>
