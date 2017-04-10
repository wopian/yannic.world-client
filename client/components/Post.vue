<template lang='pug'>
  main
    .cta(v-if='image' v-bind:style='"background-image: url(" + image + ")"')
      h1 {{ title }}
      .author
        img(src='https://pbs.twimg.com/profile_images/479952743088394240/s2KvC_zT_400x400.png')
        div
          span {{ author || 'Unknown' }}
          time(
            pubdate='pubdate'
            v-bind:datetime='date | formatDate'
            v-bind:title='date | formatDate'
          ) {{ date | timeago }}
    .container
      article(v-if='content' v-html='htmlFromMarkdown')
      div(v-else) Loading...
      social-sharing(v-bind:url='"https://yannic.world/#" + this.$route.path' inline-template)
        .social
          network(network='twitter')
            img(src='/svg/twitter.svg')
            span Twitter
          network(network='facebook')
            img(src='/svg/facebook.svg')
            span Facebook
          network(network='googleplus')
            img(src='/svg/googleplus.svg')
            span Google+
          network(network='reddit')
            img(src='/svg/reddit.svg')
            span Reddit
</template>

<script>
  import Vue from 'vue'
  import api from 'client/api'
  import config from 'client/config'
  import fm from 'front-matter'
  import { toTitleCase } from 'client/utils'
  import marked from 'client/utils/render'

  export default {
    name: 'postView',
    data () {
      return {
        content: '',
        title: null,
        date: null,
        image: null,
        author: null
      }
    },
    computed: {
      htmlFromMarkdown () {
        return marked(this.content)
      }
    },
    created () {
      this.loadPost()
    },
    methods: {
      async loadPost () {
        let text = await api.getDetail(this.$route.params.hash)

        const content = fm(text)

        this.content = content.body
        this.title = toTitleCase(content.attributes.title)
        this.date = content.attributes.date
        this.image = content.attributes.image
        this.author = content.attributes.author

        // Set window title
        window.document.title = `${this.title} - ${config.blogTitle}`
      },
      newTab () {
        Vue.nextTick(() => {
          // Load external link in new newTab
          const linksArray = Array.from(document.querySelectorAll('a'))
          const currentHost = window.location.host
          linksArray.forEach(el => {
            if (el.href && el.host !== currentHost) {
              el.target = '_blank'
              el.ref = 'noopener noreferrer'
            }
          })
        })
      }
    },
    watch: {
      'htmlFromMarkdown': 'newTab'
    }
  }
</script>

<style lang='sass' scoped>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~style/variables

  .container
    margin-top: calc(30vh - 4rem)

  .cta
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 30vh
    width: 100%
    background-size: cover
    background-position: 50% 26%
    clip-path: polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)
    &:before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: rgba($black, .5)
      z-index: 0

  h1
    color: $white
    font-size: 2rem
    position: relative
    text-align: center
    margin-top: 6rem
    @include media-breakpoint-up(sm)
      &
        font-size: 3rem
    @include media-breakpoint-up(lg)
      &
        font-size: 4rem

  .author
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    justify-content: center
    align-items: flex-start
    position: relative
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
</style>

<style lang='sass'>
  @import ~bootstrap/scss/variables
  @import ~bootstrap/scss/mixins/breakpoints
  @import ~style/variables

  article
    pre
      background: darken($white, 2)
      padding: .75rem
      border-radius: 1px
      border: 1px solid darken($white, 6)

  .social
    display: flex;
    overflow: hidden
    > span
      padding: .75rem 1rem
      color: $white
      flex: 1 1 auto;
      text-align: center
      margin-right: 1rem
      border-radius: 1px
      cursor: pointer
      &:last-of-type
        margin-right: 0
      span
        margin-left: 1rem
      @include media-breakpoint-down(sm)
        span
          display: none
    span[data-link='#share-twitter']
      background: #41b7d8
    span[data-link='#share-facebook']
      background: #3b5997
    span[data-link='#share-googleplus']
      background: #d64937
    span[data-link='#share-reddit']
      background: #ff5700
    img
      color: $white
      width: 24px
      margin-top: -.15rem
</style>
