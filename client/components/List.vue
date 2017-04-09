<template lang='pug'>
  main.container
    .row(v-if='lists')
      .col-12(v-for='{ title, sha, date, content, author } in filteredList' v-bind:key='sha')
        router-link(v-bind:to='"/" + sha') {{ title }}
        .card.card-block
          p(v-if='content') {{ content }}
          time.item-date(
            pubdate='pubdate'
            v-bind:datetime='date | formatDate'
            v-bind:title='date | formatDate'
          ) Posted {{ date | timeago }} by {{ author }}
    div(v-else) Loading...
</template>

<script>
  import api from 'client/api'
  import config from 'client/config'

  export default {
    name: 'listView',
    data () {
      return {
        lists: null
      }
    },
    computed: {
      filteredList () {
        let keyword = (this.$route.query.keyword || '').toLowerCase()
        // Filter by title, Order by publish date, desc
        return this.lists
          .filter(item => (item.title.toLowerCase().indexOf(keyword) !== -1))
          .sort((itemA, itemB) => (new Date(itemB.date) - new Date(itemA.date)))
      }
    },
    created () {
      this.loadList()
    },
    methods: {
      loadList () {
        window.document.title = config.blogTitle
        api.getList()
          .then(lists => {
            this.lists = lists
          })
          .catch(err => { console.error(err) })
      }
    },
    watch: {
      '$route': 'loadList'
    }
  }
</script>

<style lang='sass' scoped>
  @import ~style/variables

  a
    font-size: 2rem
    font-weight: 700
    color: $black
    border-bottom: .125rem dotted $primary
    text-decoration: none
    &:hover
      color: $primary

  .row > div:not(:last-of-type)
    margin-bottom: 1rem
</style>
