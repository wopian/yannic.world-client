<template lang='pug'>
  header.navbar.navbar-light.fixed-top
      nav.nav.container
        router-link.navbar-brand.mb-0(v-bind:to='{name: "list"}') {{ title }}
          span(v-if='dev') Dev
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
    background: transparent
    transition: background 400ms ease-out
    overflow-y: hidden
    border-bottom: 1px solid rgba($black, .05)
    height: 5rem
    justify-content: center
    &:hover
      background: rgba($white, .95)
      .navbar-brand
        color: darken($black, 2)
      a
        color: rgba(darken($black, 2), .7)

  nav
    flex-align: flex-start

  .navbar-brand
    padding-left: 15px
    color: $white
    font-weight: 700
    cursor: default
    &:hover
      color: darken($black, 2)
    span
      font-weight: 400

  a
    transition: color 200ms ease-out
    color: $white
    &:hover
      transition: color 100ms ease-in
</style>
