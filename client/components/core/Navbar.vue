<template lang='pug'>
  header.navbar.navbar-light.fixed-top
      nav.nav.container
        h1.navbar-brand.mb-0 {{ title }}
          span(v-if='dev') Dev
        router-link.nav-link(v-bind:to='{name: "list"}') Home
        search
</template>

<script>
  import config from 'client/config'
  import Search from 'components/core/Search'

  export default {
    components: {
      Search
    },
    data () {
      return {
        title: config.blogTitle
      }
    },
    props: [
      'dev'
    ]
  }
</script>

<style lang='sass' scoped>
  @import ~style/variables

  header
    background: $white
    transition: background 400ms ease-out
    overflow-y: hidden
    border-bottom: 1px solid rgba($black, .05)
    height: 5rem
    justify-content: center

  nav
    flex-align: flex-start

  .navbar-brand
    padding-left: 15px
    color: darken($primary, 2)
    font-weight: 700
    cursor: default
    &:hover
      color: darken($primary, 2)
    span
      font-weight: 400

  a
    transition: color 200ms ease-out
    color: rgba(darken($primary, 2), .7)
    &:hover
      color: $primary
      transition: color 100ms ease-in

  input
    margin-left: auto
</style>
