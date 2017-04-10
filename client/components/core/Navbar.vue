<template lang='pug'>
  header.navbar.navbar-light.fixed-top(v-bind:class='{ transparent: !scrolled }')
      nav.nav.container
        router-link.navbar-brand.mb-0(v-bind:to='{ name: "list" }') {{ title }}
          span(v-if='dev') Dev
        search(v-bind:scrolled='scrolled')
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
        title: config.blogTitle,
        scrolled: false
      }
    },
    props: [
      'dev'
    ],
    methods: {
      handleScroll () {
        this.scrolled = window.scrollY > 0
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~style/variables

  header
    background: rgba($white, .95)
    transition: background 400ms ease-out
    height: 5rem
    justify-content: center
    &:hover
      .navbar-brand
        color: darken($black, 2)
      a
        color: rgba(darken($black, 2), .7)
    &:not(.transparent)
      border-bottom: 1px solid rgba($black, .05)

  nav
    @include media-breakpoint-down(xs)
      &
        margin: 0

  .navbar-brand
    padding-left: 15px
    color: $black
    font-weight: 700
    &:hover
      color: darken($black, 2)
    span
      font-weight: 400

  a
    transition: color 200ms ease-out
    &:hover
      transition: color 100ms ease-in

  .transparent
    background: transparent
    &:hover
      background: rgba($white, .95)
    .navbar-brand,
    a
      color: $white
</style>
