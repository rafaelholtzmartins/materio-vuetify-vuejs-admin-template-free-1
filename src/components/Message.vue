<template>
  <div class="message-container">
    <h3>{{ msg }}</h3>
  </div>
</template>
<script>
export default {
  name: 'Message',
  props: {
    msg: String,
  },
}
</script>

<style scoped>
.message-container {
  background-color: #fd5555;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
  text-align: center;
}
h3{
    color: #fff;
}
</style>
