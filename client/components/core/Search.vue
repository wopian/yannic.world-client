<template>
  <input class='search' placeholder='Search...' ref='search' v-show='isPageList' v-model='keyword' @click='selectSearchText' @keyup.esc='resetSearch'>
</template>

<script>
  export default {
    data () {
      return {
        keyword: ''
      }
    },
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
  @import ~style/variables

  input
    margin-left: auto
    background: transparent
    border: 1px solid rgba($white, .2)
    border-radius: 999rem
    padding: 0 2rem
    color: $white
    &::-webkit-input-placeholder
      color: $white
    &:focus
      outline: none
      border-radius: 999rem
      border: 1px solid rgba($black, .2)
</style>
