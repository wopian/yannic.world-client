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
