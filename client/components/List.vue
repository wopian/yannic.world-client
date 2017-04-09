<template lang='pug'>
  main
    .cta(v-bind:style='"background-image: url(" + filteredList[0].image + ")"')
    .container
      .row(v-if='lists')
        .col(v-for='({ title, sha, date, content, author }, index) of filteredList' v-bind:key='sha')
          router-link(v-bind:to='"/" + sha') {{ toTitleCase(title) }}
          .card.card-block(v-if='index > 0')
            p(v-if='content') {{ content }}
            time.item-date(
              pubdate='pubdate'
              v-bind:datetime='date | formatDate'
              v-bind:title='date | formatDate'
            ) Posted {{ date | timeago }} by {{ author }}
          .ctaContent(v-else)
            p(v-if='content') {{ content }}
            .author
              img(src='https://pbs.twimg.com/profile_images/479952743088394240/s2KvC_zT_400x400.png')
              div
                span {{ author }}
                time(
                  pubdate='pubdate'
                  v-bind:datetime='date | formatDate'
                  v-bind:title='date | formatDate'
                ) {{ date | timeago }}
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
      },
      toTitleCase (title) {
        return title.split('-').map(word => {
          return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
        }).join(' ')
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
    // border-bottom: .125rem dotted $primary
    text-decoration: none
    &:hover
      color: $primary

  .row
    > div:not(:last-of-type)
      margin-bottom: 1rem
    > div:first-of-type
      min-width: 100%
      margin-top: 10vh
      margin-bottom: 30vh
      a
        font-size: 4rem
        text-align: center
        display: block
        color: $white
      p
        color: $white
        width: 75%
        text-align: center
        margin: 0 auto
        font-size: 1.05rem

  .author
    margin: 1rem auto 0
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: center
    align-items: flex-start
    img
      width: 2rem
      border-radius: 999rem
      display: inline-block
      margin-right: .5rem
    div
      display: inline-block
      width: auto
    span
      display: block
      color: $white
    time
      display: block
      font-size: .75rem
      color: rgba($white, .5)
      margin-top: -.5rem


  .cta
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 90vh
    width: 100%
    background-size: cover
    background-position: 0 80%
    &:after,&:before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
    &:before
      background: rgba($black, .5)
      z-index: 0
    &:after
      background: linear-gradient(to bottom, rgba($white, 0) 70%, rgba($white, 1) 95%)

  .ctaContent

</style>
