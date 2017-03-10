<template lang='pug'>
  #app(v-if='development')
    header
      nav
        h1 {{ title }}
          span(v-if='development') Dev
        router-link(:to='{name: "list"}') Home
        search-bar

    router-view
    footer-bar

  #app(v-else)
    div(style='background:white;position:relative;z-index:9999;display:flex;justify-content:center;align-items:center;width:100vw;height:100vh;')
      img(style='width:50%' src='/ohnoes.png')
</template>

<script>
import config from 'client/config'
import footerBar from 'components/footerBar.vue'
import searchBar from 'components/searchBar.vue'

export default {
  name: 'app',
  components: {
    footerBar,
    searchBar
  },
  computed: {
    development () {
      return this.$route.query.dev !== undefined ? true : window.location.port === '4004'
    }
  },
  data () {
    return {
      title: config.blogTitle
    }
  }
}
</script>

<style lang='sass'>
@import ~bootstrap/scss/bootstrap
@import ~prismjs/themes/prism.css
@import ~style/variables

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

header
  @extend .navbar
  @extend .navbar-light
  @extend .fixed-top
  background: $primary
  transition: background 400ms ease-out
  overflow-y: hidden

  nav
    @extend .nav
    @extend .container
    flex-align: flex-start

  h1
    @extend .navbar-brand
    @extend .mb-0
    padding-left: 15px
    color: $white
    font-weight: 700
    cursor: default
    &:hover
      color: $white
    span
      font-weight: 400

  a
    @extend .nav-link
    transition: color 200ms ease-out
    color: rgba($white, .7)
    &:hover
      color: $white
      transition: color 100ms ease-in

  input
    margin-left: auto
</style>
