<template>
  <footer class='footer'>Copyright © {{ thisYear }}, Yannic Geurts</footer>
</template>

<script>
  export default {
    data () {
      return {
        thisYear: new Date().getFullYear()
      }
    }
  }
</script>
