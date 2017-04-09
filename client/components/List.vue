<template lang='pug'>
  main
    .cta(v-if='lists && filteredList[0]' v-bind:style='"background-image: url(" + filteredList[0].image + ")"')
    .container
      //- Posts found
      .row(v-if='lists')
        .col.col-12.col-md-6.col-lg-4(v-for='({ title, sha, date, content, author, image }, index) of filteredList' v-bind:key='sha')
          div(v-bind:class='{ post: index > 0, ctaPost: index == 0 }')
            img(v-if='index > 0' v-bind:src='image' style='width: 100%')
            router-link(v-bind:to='"/" + sha') {{ toTitleCase(title) }}
            p(v-if='content') {{ content }}
            .author
              img(src='https://pbs.twimg.com/profile_images/479952743088394240/s2KvC_zT_400x400.png')
              div
                span {{ author || 'Unknown' }}
                time(
                  pubdate='pubdate'
                  v-bind:datetime='date | formatDate'
                  v-bind:title='date | formatDate'
                ) {{ date | timeago }}
      //- Loading posts
      div(v-else)
      //- No posts found
      div(
        v-if='lists && filteredList.length === 0'
        style='position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100vw;height:100vh;')
        //- img(style='width:50%' src='/ohnoes.png')
        p No Posts Found
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
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~style/variables

  a
    font-size: 2rem
    font-weight: 700
    text-decoration: none

  .row
    > div:not(:last-of-type)
      margin-bottom: 1rem
    > div:first-of-type
      min-width: 100%
      margin-top: 7.5vh
      @include media-breakpoint-up(sm)
        &
          margin-top: 10vh
      a
        font-size: 4rem
        text-align: center
        display: block
        color: $white
        font-size: 2rem
        @include media-breakpoint-up(sm)
          &
            font-size: 3rem
        @include media-breakpoint-up(lg)
          &
            font-size: 4rem
      p
        color: $white
        width: 75%
        text-align: center
        margin: 0 auto
        font-size: 1.05rem

  .author
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: center
    align-items: flex-start
    img
      width: 2.5rem
      border-radius: 999rem
      margin-right: .5rem
    div
      display: inline-block
      width: auto
      height: 2.5rem
      display: flex
      flex-direction: column
      justify-content: center
    span
      display: block
      color: $white
    time
      display: block
      font-size: .75rem
      color: rgba($white, .5)
      margin-top: -.5rem

  .post
    > img
      border-radius: 1px
      height: 14rem
      object-fit: cover
      background: rgba($black, .2)
    a
      color: $black
      font-size: 24px
      letter-spacing: -.02rem
      display: block
      margin-top: .75rem
      margin-bottom: .25rem
    p
      margin-bottom: .5rem
    .author
      justify-content: flex-start
    span
      color: darken($primary, 6)
    time
      color: rgba($black, .5)


  .cta
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 70vh
    width: 100%
    background-size: cover
    background-position: 0 80%
    clip-path: polygon(0 0, 100% 0, 100% 95%, 50% 100%, 0 95%)
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba($black, .5)
      z-index: 0

  .ctaPost
    height: calc(70vh - 10rem)
    .author
      margin: 1rem auto 0

</style>
