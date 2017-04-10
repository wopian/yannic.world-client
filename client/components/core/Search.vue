<template lang='pug'>
  input(
    placeholder='Search...'
    ref='search'
    v-bind:class='{ transparent: !scrolled }'
    v-show='isPageList'
    v-model='keyword'
    @click='selectSearchText'
    @keyup.esc='resetSearch'
  )
</template>

<script>
  export default {
    data () {
      return {
        keyword: ''
      }
    },
    props: [
      'scrolled'
    ],
    computed: {
      isPageList () {
        return this.$route.name === 'list'
      }
    },
    methods: {
      resetSearch () {
        this.keyword = ''
        this.$refs.search.blur()
      },
      selectSearchText () {
        this.$refs.search.select()
      }
    },
    watch: {
      'keyword' () {
        if (this.keyword) {
          this.$router.push({ name: 'list', query: { keyword: this.keyword } })
        } else {
          this.$router.push({ name: 'list' })
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~style/variables

  input
    margin-left: auto
    background: transparent
    border: 1px solid rgba($black, .2)
    border-radius: 999rem
    padding: 0 2rem
    color: $black
    max-width: 260px
    &::-webkit-input-placeholder
      color: $black
    &:focus
      outline: none
      border-radius: 999rem
      border: 1px solid rgba($black, .2)
    @include media-breakpoint-down(xs)
      &
        width: 100%

  .transparent
    border: 1px solid rgba($white, .2)
    color: $white
    &::-webkit-input-placeholder
      color: $white
    &:focus
      border: 1px solid rgba($white, .2)
</style>

<style lang='sass'>
  @import ~style/variables

  header.transparent:hover
    .transparent
      content: 'hello'
      border: 1px solid rgba($black, .2)
      color: $black
      &::-webkit-input-placeholder
        color: $black
</style>
