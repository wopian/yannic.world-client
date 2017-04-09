<template lang='pug'>
  #app(v-if='dev')
    navbar(v-bind:dev='dev')
    router-view
    foobar

  #app(v-else)
    div(style='background:white;position:relative;z-index:9999;display:flex;justify-content:center;align-items:center;width:100vw;height:100vh;')
      img(style='width:50%' src='/ohnoes.png')
</template>

<script>
  import Navbar from 'components/core/Navbar'
  import Footer from 'components/core/Footer'

  export default {
    name: 'app',
    components: {
      Navbar,
      Foobar: Footer
    },
    computed: {
      dev () {
        return window.location.hostname === 'localhost'
      }
    }
  }
</script>

<style lang='sass'>
  @import ~prismjs/themes/prism.css
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins
  @import ~bootstrap/scss/normalize
  // @import ~bootstrap/scss/print
  @import ~bootstrap/scss/reboot
  // @import ~bootstrap/scss/type
  // @import ~bootstrap/scss/images
  // @import ~bootstrap/scss/code
  @import ~bootstrap/scss/grid
  // @import ~bootstrap/scss/tables
  // @import ~bootstrap/scss/forms
  // @import ~bootstrap/scss/buttons
  // @import ~bootstrap/scss/transitions
  // @import ~bootstrap/scss/dropdown
  // @import ~bootstrap/scss/button-group
  // @import ~bootstrap/scss/input-group
  // @import ~bootstrap/scss/custom-forms
  @import ~bootstrap/scss/nav
  @import ~bootstrap/scss/navbar
  @import ~bootstrap/scss/card
  // @import ~bootstrap/scss/breadcrumb
  // @import ~bootstrap/scss/pagination
  // @import ~bootstrap/scss/badge
  // @import ~bootstrap/scss/jumbotron
  // @import ~bootstrap/scss/alert
  // @import ~bootstrap/scss/progress
  // @import ~bootstrap/scss/media
  // @import ~bootstrap/scss/list-group
  // @import ~bootstrap/scss/responsive-embed
  // @import ~bootstrap/scss/close
  // @import ~bootstrap/scss/modal
  // @import ~bootstrap/scss/tooltip
  // @import ~bootstrap/scss/popover
  // @import ~bootstrap/scss/carousel
  @import ~bootstrap/scss/utilities
</style>

<style lang='sass' scoped>
  @import ~style/variables

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    display: flex
    flex-direction: column
    min-height: 100vh
    padding-top: 6rem
    background: darken($white, .5)

  main
    flex: 3
</style>
